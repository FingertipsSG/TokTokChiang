import React, { useRef } from "react";
import {
  List,
  AutoSizer,
  CellMeasurer,
  CellMeasurerCache,
} from "react-virtualized";
import ResizeObserver from "rc-resize-observer";

import "../Components/css/shop.css";
import { Container, Row, Col } from "react-grid-system";

// This component handles takes in the data from respective shop page and format it into grid display NOTE
function ShopContainer(props) {
  const cache = useRef(
    new CellMeasurerCache({
      fixedWidth: true,
      defaultHeight: 350,
    })
  );

  // To convert BLOB to base64 encoded then load the base64 image STEP
  const convertToBase64 = (imgData) => {
    const imageBuffer = Buffer.from(imgData);
    const imageBuffer64 = imageBuffer.toString("base64");

    return imageBuffer64;
  };

  // Function to render content
  // Function to render rows STEP
  const renderContent = (arrs) => {
    return (
      <div style={{ width: "100%", height: "100vh" }}>
        <AutoSizer>
          {({ width, height }) => {
            return (
              <List
                width={width}
                height={height}
                autoHeight
                rowHeight={cache.current.rowHeight}
                deferredMeasurementCache={cache.current}
                rowCount={arrs.length}
                rowRenderer={({ key, index, style, parent }) => {
                  return (
                    <CellMeasurer
                      key={key}
                      cache={cache.current}
                      parent={parent}
                      columnIndex={0}
                      rowIndex={index}
                    >
                      {({ measure }) => {
                        return (
                          <Row style={style}>
                            {renderColContent(arrs[index], index, measure)}
                          </Row>
                        );
                      }}
                    </CellMeasurer>
                  );
                }}
              />
            );
          }}
        </AutoSizer>
      </div>
    );
  };

  // Function to render columns STEP
  const renderColContent = (arr, rowIndex, measure) => {
    return arr.map((item, colIndex) => {
      return (
        <ResizeObserver key={colIndex} onResize={measure} onPosition={measure}>
          <Col xs={12} sm={10} md={5} lg={3}>
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
        </ResizeObserver>
      );
    });
  };

  return <div>{renderContent(props.itemArr)}</div>;
}

export default ShopContainer;
