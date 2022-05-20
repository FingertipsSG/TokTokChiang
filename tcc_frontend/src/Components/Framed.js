import "antd/es/spin/style/css";
import "../Components/css/shop.css";
import { Container } from "react-grid-system";
import Navbar from "./Navbar";
import { Spin } from "antd";

// Components to render on screen NOTE
import ShopContainer from "./ShopContainer";
import ProductModal from "./ProductModal";

// To load dolls from database NOTE
import { Utils } from "../Helper";
import React, { useState, useEffect } from "react";
import Frame from "../Models/Frame";

function Framed() {
  // states for data loading STEP
  const [frames, setFrames] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // final array is converted into a 2D array, so need row and col index NOTE
  const [curFrameSelectedIndex, setCurFrameSelectedIndex] = useState({
    row: undefined,
    col: undefined,
  });

  // To format display into specified number of columns per row STEP
  const formatDisplay = (arr, colSize) => {
    const formattedArr = [];

    while (arr.length) {
      formattedArr.push(arr.splice(0, colSize));
    }

    setFrames(formattedArr);
  };

  // Get data from backend STEP
  const getFrames = async () => {
    setIsLoading(true);
    const res = await Utils.getProducts("framed", {});

    // Keep pushing new doll to dolls array
    let framesArr = [];

    res.forEach((frame) => {
      let newFrame = new Frame(
        frame.product_name,
        frame.product_description,
        frame.product_price,
        frame.product_image
      );

      framesArr.push(newFrame);
    });

    formatDisplay(framesArr, 4);
    setIsLoading(false);
  };

  // To trigger and load data at every first render only STEP
  useEffect(() => {
    getFrames();
  }, []);

  // open modal STEP
  const openModal = (rowIndex, colIndex) => {
    setCurFrameSelectedIndex({ row: rowIndex, col: colIndex });
  };

  return (
    <html>
      <head>
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
        <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.0/js/bootstrap.min.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.16.0/umd/popper.min.js"></script>
      </head>

      <body className="framed-body shop-body">
        <Navbar />
        <div className="shop-container">
          {isLoading ? (
            <div className="centred">
              <Spin size="default" spinning={isLoading} />
            </div>
          ) : (
            <Container className="shop">
              <ShopContainer openModal={openModal} itemArr={frames} />
              {curFrameSelectedIndex.row !== undefined &&
                curFrameSelectedIndex.col !== undefined && (
                  <ProductModal
                    curItem={
                      frames[curFrameSelectedIndex.row][
                        curFrameSelectedIndex.col
                      ]
                    }
                  />
                )}
            </Container>
          )}
        </div>
      </body>
    </html>
  );
}

export default Framed;
