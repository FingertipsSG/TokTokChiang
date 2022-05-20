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
import Puppet from "../Models/Puppet";

function HandPuppets() {
  // states for data loading STEP
  const [puppets, setPuppets] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // final array is converted into a 2D array, so need row and col index NOTE
  const [curPuppetSelectedIndex, setCurPuppetSelectedIndex] = useState({
    row: undefined,
    col: undefined,
  });

  // To format display into specified number of columns per row STEP
  const formatDisplay = (arr, colSize) => {
    const formattedArr = [];

    while (arr.length) {
      formattedArr.push(arr.splice(0, colSize));
    }

    setPuppets(formattedArr);
  };

  // Get data from backend STEP
  const getPuppets = async () => {
    setIsLoading(true);
    const res = await Utils.getProducts("puppets", {});

    // Keep pushing new doll to dolls array
    let puppetsArr = [];

    res.forEach((puppet, index) => {
      let newPuppet = new Puppet(
        puppet.product_name,
        puppet.product_description,
        puppet.product_price,
        puppet.product_image
      );

      puppetsArr.push(newPuppet);
    });

    formatDisplay(puppetsArr, 4);
    setIsLoading(false);
  };

  // To trigger and load data at every first render only STEP
  useEffect(() => {
    getPuppets();
  }, []);

  // open modal STEP
  const openModal = (rowIndex, colIndex) => {
    setCurPuppetSelectedIndex({ row: rowIndex, col: colIndex });
  };

  return (
    <html>
      <head>
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
        <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.0/js/bootstrap.min.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.16.0/umd/popper.min.js"></script>
      </head>

      <body className="puppets-body shop-body">
        <Navbar />
        <div className="shop-container">
          {isLoading ? (
            <div className="centred">
              <Spin size="default" spinning={isLoading} />
            </div>
          ) : (
            <Container className="shop">
              <ShopContainer openModal={openModal} itemArr={puppets} />
              {curPuppetSelectedIndex.row !== undefined &&
                curPuppetSelectedIndex.col !== undefined && (
                  <ProductModal
                    curItem={
                      puppets[curPuppetSelectedIndex.row][
                        curPuppetSelectedIndex.col
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

export default HandPuppets;
