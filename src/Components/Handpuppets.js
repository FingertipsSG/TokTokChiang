import "antd/es/spin/style/css";
import "../Components/css/shop.css";
import { Container, Row, Col } from "react-grid-system";
import Navbar from "./Navbar";
import { Spin } from "antd";

// Components to render on screen NOTE
import ProductModal from "./ProductModal";

// To load dolls from database NOTE
import { Utils } from "../Helper";
import React, { useState, useEffect, useRef, useCallback } from "react";
import Product from "../Models/Product";

function HandPuppets() {
  // states for data loading STEP
  const [puppets, setPuppets] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [startRow, setStartRow] = useState(0);
  const [endRow, setEndRow] = useState(12);

  // final array is converted into a 2D array, so need row and col index NOTE
  const [curPuppetSelectedIndex, setCurPuppetSelectedIndex] = useState({
    row: undefined,
    col: undefined,
  });

  const [isWideScreen, setIsWideScreen] = useState(window.innerWidth >= 1023);

  // Have a function to load data from database into array
  // To format display into specified number of columns per row STEP
  const formatDisplay = (arr, colSize) => {
    const formattedArr = [];

    while (arr.length) {
      formattedArr.push(arr.splice(0, colSize));
    }

    return formattedArr;
  };

  // A function to load data STEP
  const getData = async () => {
    try {
      // If first render or no items, should use big spinner
      const hasNoItems = puppets.length === 0;

      // Choose type of loading
      if (hasNoItems) {
        setIsLoading(true);
      } else {
        setIsLoadingMore(true);
      }

      // Fetch data from backend
      var res = await Utils.getProductsLazyLoad(startRow, endRow, {
        categoryId: 2,
      });

      // If no results returned
      if (res.data.message === "No products found") {
        setHasMore(false);
      } else {
        // Keep pushing new puppet to puppets array
        let puppetsArr = [];

        res = res.data;
        res.forEach((puppet, index) => {
          let newPuppet = new Product(
            puppet.productid,
            puppet.productname,
            puppet.productdesc,
            puppet.price,
            puppet.image,
            puppet.url
          );

          puppetsArr.push(newPuppet);
        });

        // Update state array
        const curArr = puppets;
        const newArr = formatDisplay(puppetsArr, 4);
        for (let arr of newArr) {
          curArr.push(arr);
        }
        setPuppets(curArr);
      }

      if (hasNoItems) {
        setIsLoading(false);
      } else {
        setIsLoadingMore(false);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const observer = useRef();
  const lastRowElementRef = useCallback(
    (node) => {
      if (observer.current) {
        observer.current.disconnect();
      }

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setStartRow((prevCount) => prevCount + 12);
          setEndRow((prevCount) => prevCount + 12);
          observer.current.disconnect();
        }
      });

      if (node) {
        observer.current.observe(node);
      }
    },
    [hasMore, isLoading, isLoadingMore, puppets]
  );

  // To trigger whenever on first render / loading more data when reach bottom of page
  useEffect(() => {
    // Fetch the next 12 rows of data STEP
    if (hasMore) {
      getData();
    }
  }, [startRow]);

  // open modal STEP
  const openModal = (rowIndex, colIndex) => {
    setCurPuppetSelectedIndex({ row: rowIndex, col: colIndex });
  };

  // convert image to base64 STEP
  const convertToBase64 = (imgData) => {
    const imageBuffer = Buffer.from(imgData);
    const imageBuffer64 = imageBuffer.toString("base64");

    return imageBuffer64;
  };

  // Function to update styles according to viewport's width STEP
  const getRowStyles = () => {
    if (window.innerWidth >= 1023) {
      setIsWideScreen(true);
    } else {
      setIsWideScreen(false);
    }
  };

  // Change Row styles according to viewport's width STEP
  useEffect(() => {
    window.addEventListener("resize", getRowStyles);

    return () => {
      window.removeEventListener("resize", getRowStyles);
    };
  });

  // Function to render columns content STEP
  const renderColContent = (arr, rowIndex) => {
    return arr.map((item, colIndex) => {
      return (
        <Col
          xs={10}
          sm={9}
          md={5}
          lg={3}
          xl={3}
          key={colIndex}
          className="shopContent"
        >
          <div className="imagePlaceHolder">
            <a
              id="close-image"
              data-toggle="modal"
              data-target="#myModal"
              onClick={() => {
                openModal(rowIndex, colIndex);
              }}
            >
              <img
                className="main-image"
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

  // Decide what to render STEP
  const renderController = () => {
    if (isLoading) {
      return (
        <div className="centred">
          <Spin size="default" spinning={isLoading} />
        </div>
      );
    }

    if (puppets.length === 0) {
      return <h1 className="comingsoon">COMING SOON</h1>;
    } else {
      return (
        <Container className="shop">
          {puppets.map((arr, index) => {
            if (index === puppets.length - 1) {
              return (
                <div key={index} ref={lastRowElementRef}>
                  <Row
                    style={
                      isWideScreen && arr.length < 4
                        ? { justifyContent: "flex-start" }
                        : { justifyContent: "center" }
                    }
                  >
                    {renderColContent(arr, index)}
                  </Row>
                </div>
              );
            } else {
              return (
                <div key={index}>
                  <Row
                    style={
                      isWideScreen && arr.length < 4
                        ? { justifyContent: "flex-start" }
                        : { justifyContent: "center" }
                    }
                  >
                    {renderColContent(arr, index)}
                  </Row>
                </div>
              );
            }
          })}
          {isLoadingMore && (
            <div className="loadmore-centred">
              <Spin size="small" spinning={isLoadingMore} />
            </div>
          )}
          {curPuppetSelectedIndex.row !== undefined &&
            curPuppetSelectedIndex.col !== undefined && (
              <ProductModal
                isWideScreen={isWideScreen}
                curItem={
                  puppets[curPuppetSelectedIndex.row][
                    curPuppetSelectedIndex.col
                  ]
                }
              />
            )}
        </Container>
      );
    }
  };

  return (
    <html className="shop-html">
      <head>
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
        <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.0/js/bootstrap.min.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.16.0/umd/popper.min.js"></script>
      </head>

      <body className="puppets-skyline">
        <div className="puppets-body shop-body">
          <Navbar />
          <br />
          <br />
          <p className="shopHeader">HAND PUPPETS</p>
          <div className="shop-container">{renderController()}</div>
          <div className="shop-height"></div>
        </div>
      </body>
    </html>
  );
}

export default HandPuppets;
