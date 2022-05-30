import React, { useEffect, useState } from "react";
import "./ImagesModal.css";

const ImagesModal = (props) => {
  return (
    <div id="myModal" className="modal fade imageModal" role="dialog">
      <div className="modal-dialog modal-xl">
        <div className="modal-content">
          <div className="modal-header">
            <div className="header-text">Images</div>
            <button
              className="header-text"
              type="button"
              data-dismiss="modal"
              onClick={props.onCloseModal}
            >
              X
            </button>
          </div>

          <div className="modal-body">
            <div className="images-container">
              {props.images.map((img, index) => {
                return (
                  <div key={index} className="modal-image-container">
                    <img className="modal-image" src={img} />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImagesModal;
