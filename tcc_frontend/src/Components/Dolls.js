import "../Components/css/shop.css";
import { Container, Row, Col } from "react-grid-system";
import Navbar from "./Navbar";
// import doll1 from "../Assets/Images/doll1.jpg";
// import back1 from "../Assets/Images/Back 1.jpg";
// import side1 from "../Assets/Images/Side1.jpg";
// import side2 from "../Assets/Images/Other side 1.jpg";

// To load dolls from database NOTE
import { Utils } from "../Helper";
import React, { useState, useEffect } from "react";
import Doll from "../Models/doll";

function Dolls() {
  // states for data loading STEP
  const [dolls, setDolls] = useState([]);
  // const [isLoading, setIsLoading] = useState(false);

  // final array is converted into a 2D array, so need row and col index NOTE
  const [curDollSelectedIndex, setCurDollSelectedIndex] = useState({
    row: undefined,
    col: undefined,
  });

  // To format display into specified number of columns per row STEP
  const formatDisplay = (arr, colSize) => {
    const formattedArr = [];

    while (arr.length) {
      formattedArr.push(arr.splice(0, colSize));
    }

    setDolls(formattedArr);
  };

  // Get data from backend STEP
  const getDolls = async () => {
    // setIsLoading(true);
    const res = await Utils.getProducts("dolls", {});

    // Keep pushing new doll to dolls array
    let dollsArr = [];

    res.forEach((doll) => {
      let newDoll = new Doll(
        doll.product_name,
        doll.product_description,
        doll.product_price,
        doll.product_image
      );

      dollsArr.push(newDoll);
    });

    formatDisplay(dollsArr, 4);
    // setIsLoading(false);
  };

  // To trigger and load data at every first render only STEP
  useEffect(() => {
    getDolls();
  }, []);

  // To convert BLOB to base64 encoded then load the base64 image STEP
  const convertToBase64 = (imgData) => {
    const imageBuffer = Buffer.from(imgData);
    const imageBuffer64 = imageBuffer.toString("base64");

    return imageBuffer64;
  };

  // open modal STEP
  // const openModal = () => {
  //   $("#myModal").modal("show");
  // };

  // Function to render content
  // Function to render rows STEP
  const renderContent = (arrs) => {
    return arrs.map((arr, rowIndex) => {
      return <Row key={rowIndex}>{renderColContent(arr, rowIndex)}</Row>;
    });
  };

  // Function to render columns STEP
  const renderColContent = (arr, rowIndex) => {
    return arr.map((item, colIndex) => {
      return (
        <Col sm={6} md={3} key={colIndex}>
          <div className="imagePlaceHolder">
            <a
              id="close-image"
              data-toggle="modal"
              data-target="#myModal"
              onClick={() => {
                setCurDollSelectedIndex({ row: rowIndex, col: colIndex });
                // openModal();
              }}
            >
              <img
                className="dolls-image"
                src={`data:image/jpg;base64,${convertToBase64(item.image)}`}
              />
            </a>
            <p className="title">{item.name}</p>
            <p className="price">${item.price} Incl. GST</p>
          </div>
        </Col>
      );
    });
  };

  return (
    <html>
      <head>
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.16.0/umd/popper.min.js"></script>
        <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.0/js/bootstrap.min.js"></script>
      </head>

      <body className="dolls-body">
        <Navbar />
        <div className="dolls">
          <Container className="dolls-container">
            {renderContent(dolls)}
            {curDollSelectedIndex.row !== undefined &&
              curDollSelectedIndex.col !== undefined && (
                <div id="myModal" className="modal fade" role="dialog">
                  <div className="modal-dialog modal-xl">
                    <div className="modal-content">
                      <button
                        className="close-button"
                        type="button"
                        data-dismiss="modal"
                      >
                        X
                      </button>
                      <div className="modal-body">
                        <Row>
                          <Col>
                            <img
                              className="popup-image"
                              src={`data:image/jpg;base64,${convertToBase64(
                                dolls[curDollSelectedIndex.row][
                                  curDollSelectedIndex.col
                                ].image
                              )}`}
                            />
                            {/* <Row>
                                <Col>
                                  <img className="small-image" src={side1} />
                                </Col>
                                <Col>
                                  <img className="small-image" src={back1} />
                                </Col>
                                <Col>
                                  <img className="small-image" src={side2} />
                                </Col>
                              </Row> */}
                          </Col>
                          <Col>
                            <div>
                              <div>
                                <p className="pop-title">
                                  {
                                    dolls[curDollSelectedIndex.row][
                                      curDollSelectedIndex.col
                                    ].name
                                  }
                                </p>
                              </div>
                              <div>
                                <p className="pop-price">
                                  $
                                  {
                                    dolls[curDollSelectedIndex.row][
                                      curDollSelectedIndex.col
                                    ].price
                                  }{" "}
                                  Incl. GST
                                </p>
                              </div>
                              <div className="pop-text">
                                <p>
                                  {
                                    dolls[curDollSelectedIndex.row][
                                      curDollSelectedIndex.col
                                    ].desc.split("\n")[0]
                                  }
                                </p>
                                <p>
                                  {
                                    dolls[curDollSelectedIndex.row][
                                      curDollSelectedIndex.col
                                    ].desc.split("\n")[1]
                                  }
                                </p>
                                <p>
                                  {
                                    dolls[curDollSelectedIndex.row][
                                      curDollSelectedIndex.col
                                    ].desc.split("\n")[2]
                                  }
                                </p>
                              </div>
                              <div>
                                <button type="button" className="shop-here">
                                  Shop Here
                                </button>
                              </div>
                            </div>
                          </Col>
                        </Row>
                      </div>
                    </div>
                  </div>
                </div>
              )}
          </Container>
        </div>
      </body>
    </html>
  );
}

export default Dolls;
