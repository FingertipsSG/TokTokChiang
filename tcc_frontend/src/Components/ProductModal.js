import "../Components/css/shop.css";
import { Container, Row, Col } from "react-grid-system";

// This component displays product details when user clicks on product NOTE
function ProductModal(props) {
  // To convert BLOB to base64 encoded then load the base64 image STEP
  const convertToBase64 = (imgData) => {
    const imageBuffer = Buffer.from(imgData);
    const imageBuffer64 = imageBuffer.toString("base64");

    return imageBuffer64;
  };

  return (
    <div id="myModal" className="modal fade" role="dialog">
      <div className="modal-dialog modal-xl">
        <div className="modal-content">
          <div class="close-button-container">
            <button className="close-button" type="button" data-dismiss="modal">
              X
            </button>
          </div>
          <div className="modal-body">
            <Row>
              <Col className="modal-image-container">
                <img
                  className="popup-image"
                  src={`data:image/jpg;base64,${convertToBase64(
                    props.curItem.image
                  )}`}
                />
              </Col>
              <Col className="modal-text-container">
                <div>
                  <div>
                    <p className="pop-title">{props.curItem.name}</p>
                  </div>
                  <div>
                    <p className="pop-price">
                      ${props.curItem.price} Incl. GST
                    </p>
                  </div>
                  <div className="pop-text">
                    <p>{props.curItem.desc.split("\n")[0]}</p>
                    <p>{props.curItem.desc.split("\n")[1]}</p>
                    <p>{props.curItem.desc.split("\n")[2]}</p>
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
  );
}

export default ProductModal;
