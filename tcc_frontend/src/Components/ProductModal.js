import "../Components/css/shop.css";
import { Container, Row, Col } from "react-grid-system";
import { Spin } from "antd";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";

import React, { useEffect, useState } from "react";
import { Utils } from "../Helper/index";

// This component displays product details when user clicks on product NOTE
function ProductModal(props) {
  // States
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isWideScreen, setIsWideScreen] = useState(window.innerWidth >= 992);

  // Check if screen is wide enough to display gallery STEP
  const updateMedia = () => {
    setIsWideScreen(window.innerWidth >= 992);
  };

  // To convert BLOB to base64 encoded then load the base64 image STEP
  const convertToBase64 = (imgData) => {
    const imageBuffer = Buffer.from(imgData);
    const imageBuffer64 = imageBuffer.toString("base64");

    return imageBuffer64;
  };

  // Remove first element and add it to the back STEP
  const toggleLeft = () => {
    const prevLastElement = images[images.length - 1];
    setImages((prevArr) => [
      ...[prevLastElement],
      ...prevArr.slice(0, prevArr.length - 1),
    ]);
  };

  // Remove last element and add it to the front STEP
  const toggleRight = () => {
    setImages((prevArr) => [...prevArr.slice(1), ...[prevArr[0]]]);
  };

  // Fetch images data STEP
  const getData = async () => {
    try {
      setIsLoading(true);
      var res = await Utils._getApi("getOtherImages", {
        productId: props.curItem.productId,
      });

      let imgsArr = [
        `data:image/jpg;base64,${convertToBase64(props.curItem.image)}`,
      ];

      // If no results returned
      if (res.status === 404) {
        console.log("has no more images");
        setImages(imgsArr);
      } else {
        res = res.data;
        for (let imgData of res) {
          imgsArr.push(
            `data:image/jpg;base64,${convertToBase64(imgData.image)}`
          );
        }

        setImages(imgsArr);
      }
      setIsLoading(false);
    } catch (err) {
      console.log(err);
      setIsLoading(false);
    }
  };

  // To update images to corresponding item whenever modal is opened STEP
  useEffect(() => {
    getData();
  }, [props.curItem]);

  // To check if screen is wide enough to render gallery STEP
  useEffect(() => {
    window.addEventListener("resize", updateMedia);

    return () => {
      window.removeEventListener("resize", updateMedia);
    };
  });

  return (
    <div id="myModal" className="modal fade" role="dialog">
      <div className="modal-dialog modal-xl">
        <div className="modal-content">
          {isLoading ? (
            <div className="modal-spinner loadmore-centred">
              <Spin size="default" spinning={isLoading} />
            </div>
          ) : (
            <div>
              <div className="close-button-container">
                <button
                  className="close-button"
                  type="button"
                  data-dismiss="modal"
                >
                  X
                </button>
              </div>
              <div className="modal-body">
                <Row>
                  <Col className="modal-image-container">
                    <div className="modal-main-image-container">
                      {images.length > 1 && (
                        <div className="modal-toggle-button-container toggle-left">
                          <LeftOutlined
                            style={{ fontSize: "150%" }}
                            className="toggle-button"
                            onClick={toggleLeft}
                          />
                        </div>
                      )}
                      <img className="popup-image" src={images[0]} />
                      {images.length > 1 && (
                        <div className="modal-toggle-button-container toggle-right">
                          <RightOutlined
                            style={{ fontSize: "150%" }}
                            className="toggle-button"
                            onClick={toggleRight}
                          />
                        </div>
                      )}
                    </div>
                    <Row>
                      <div className="modal-side-images-container">
                        {images.length > 1 &&
                          isWideScreen &&
                          images.map((img, index) => {
                            if (index === 0) {
                              return;
                            }

                            return (
                              <Col className="side-image-container" key={index}>
                                <img className="small-image" src={img} />
                              </Col>
                            );
                          })}
                      </div>
                    </Row>
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
          )}
        </div>
      </div>
    </div>
  );
}

export default ProductModal;
