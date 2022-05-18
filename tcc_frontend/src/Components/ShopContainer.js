import "../Components/css/shop.css";
import { Container, Row, Col } from "react-grid-system";

// This component handles takes in the data from respective shop page and format it into grid display NOTE
function ShopContainer(props) {
  // To format display into specified number of columns per row STEP
  const formatDisplay = (arr, colSize) => {
    const formattedArr = [];

    while (arr.length) {
      formattedArr.push(arr.splice(0, colSize));
    }

    setDolls(formattedArr);
  };

  // To convert BLOB to base64 encoded then load the base64 image STEP
  const convertToBase64 = (imgData) => {
    const imageBuffer = Buffer.from(imgData);
    const imageBuffer64 = imageBuffer.toString("base64");

    return imageBuffer64;
  };

  // open modal STEP
  const openModal = () => {
    $("#myModal").modal("show");
  };

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
        <Col xs={10} sm={7} md={5} lg={3} key={colIndex}>
          <div className="imagePlaceHolder">
            <a
              id="close-image"
              data-toggle="modal"
              data-target="#myModal"
              onClick={() => {
                props.openModal(rowIndex, colIndex);
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

  return <div>{renderContent(props.itemArr)}</div>;
}

export default ShopContainer;
