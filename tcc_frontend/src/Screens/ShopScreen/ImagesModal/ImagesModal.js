import React, { useState, useEffect } from "react";
import { Spin } from "antd";
import "antd/dist/antd.css";
import "./ImagesModal.css";

import { Utils } from "../../../Helper/index";

const ImagesModal = (props) => {
  // States STEP
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // To convert BLOB to base64 encoded then load the base64 image STEP
  const convertToBase64 = (imgData) => {
    const imageBuffer = Buffer.from(imgData);
    const imageBuffer64 = imageBuffer.toString("base64");

    return imageBuffer64;
  };

  // Get other images from backend STEP
  const getData = async () => {
    try {
      setIsLoading(true);
      var res = await Utils._getApi("getOtherImages", {
        productId: props.curItem.pID,
      });

      let imgsArr = [
        `data:image/jpg;base64,${convertToBase64(props.curItem.pImage)}`,
      ];

      // If no results returned
      if (res.status === 404) {
        console.log("has no more images");
        console.log(imgsArr);
        setImages(imgsArr);
      } else {
        res = res.data;
        for (let imgData of res) {
          imgsArr.push(
            `data:image/jpg;base64,${convertToBase64(imgData.image)}`
          );
        }
        console.log(imgsArr);
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

  return (
    <div id="myModal" className="modal fade" role="dialog">
      <div className="modal-dialog modal-xl">
        <div className="modal-content">
          <div className="modal-header">
            <div className="header-text">Images</div>
            <button
              className="header-text"
              type="button"
              data-dismiss="modal"
              onClick={props.closeModal}
            >
              X
            </button>
          </div>

          <div className="modal-body">
            {isLoading ? (
              <div className="modal-spinner loadmore-centred">
                <Spin size="default" spinning={isLoading} />
              </div>
            ) : (
              <div className="images-container">
                {images.map((img, index) => {
                  return (
                    <div key={index} className="modal-image-container">
                      <img className="modal-image" src={img} />
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImagesModal;
