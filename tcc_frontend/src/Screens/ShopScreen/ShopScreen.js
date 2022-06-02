import React, { useState, useEffect } from "react";
import CustomNavbar from "../Components/CustomNavbar/CustomNavbar";
import { Utils } from "../../Helper";
import { Table, Space, Popconfirm, message, Spin } from "antd";
import "antd/dist/antd.css";
import "./ShopScreen.css";
import { Buffer } from "buffer";

import CustomSearchBar from "../Components/CustomSearchBar/CustomSearchBar";
import CustomButton from "../Components/CustomButton/CustomButton";
import TypeDropdown from "./TypeDropdown/TypeDropdown";
import AddProductModal from "./AddProductModal/AddProductModal";
import EditProductModal from "./EditProductModal/EditProductModal";
import EditShopModal from "./EditShopModal/EditShopModal";
import ImagesModal from "./ImagesModal/ImagesModal";
// import AddShopModal from "./AddShopModal/AddShopModal";

import { useFirstRender } from "../../Helper/useFirstRender";

function ShopScreen() {
  const [type, setType] = useState("Shops");
  const [productArray, setProductArray] = useState([]);
  const [ShopArray, setShopArray] = useState([]);
  const [curProdDetails, setCurProdDetails] = useState({});
  const [shopEdit, setShopEdit] = useState({});
  const [isAddProdModalVisible, setIsAddProdModalVisible] = useState(false);
  const [isEditProdModalVisible, setIsEditProdModalVisible] = useState(false);
  const [isAddShopModalVisible, setIsAddShopModalVisible] = useState(false);
  const [isEditShopModalVisible, setIsEditShopModalVisible] = useState(false);
  const [isImageModalVisible, setIsImageModalVisible] = useState(false);
  const [render, setRender] = useState(false);
  const [isTableLoading, setIsTableLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [curProductSelected, setCurProductSelected] = useState(null);
  const [productImages, setProductImages] = useState([]);

  const firstRender = useFirstRender();

  const columns = [
    {
      title: "Product Id",
      dataIndex: "pID",
      key: "pID",
    },
    {
      title: "Product Name",
      dataIndex: "pName",
      key: "pName",
    },
    {
      title: "Description",
      dataIndex: "pDesc",
      key: "pDesc",
    },
    {
      title: "Price",
      dataIndex: "pPrice",
      key: "pPrice",
    },
    {
      title: "Image(s)",
      dataIndex: "pImage",
      key: "pImage",
      Header: "Pictures",
      render: (productArray, props) => {
        if (productArray === undefined) {
          return;
        }
        // console.log("props are: ", props);
        // console.log("testing", props.pImage.data);
        return (
          <Space size="middle" className="images-column">
            <img
              className="image"
              src={`data:image/jpg;base64,${convertToBase64(
                props.pImage.data
              )}`}
            />
            <a
              id="close-image"
              data-toggle="modal"
              data-target="#myModal"
              onClick={() => {
                setCurProductSelected(props);
                setIsImageModalVisible(true);
              }}
            >
              View all
            </a>
          </Space>
        );
      },
    },
    {
      title: "Buy URL",
      dataIndex: "pURL",
      key: "pURL",
      render: (text, record) => (
        <span>
          <a href={record.pURL}>{record.pURL}</a>
        </span>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <Space size="middle">
          <a
            onClick={() => {
              setCurProductSelected(record);
            }}
          >
            Edit
          </a>
          <Popconfirm
            title={`Are you sure you want to delete ${record.pName}`}
            onConfirm={() => {
              onDeleteProduct(record.pID);
            }}
            okText="Yes"
            cancelText="No"
          >
            <a>Delete</a>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const shopColumn = [
    {
      title: "Shop Id",
      dataIndex: "sID",
      key: "sID",
    },
    {
      title: "Shop Name",
      dataIndex: "sName",
      key: "sName",
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <Space size="middle">
          <a
            onClick={() => {
              setShopEdit({
                sID: record.sID,
                sName: record.sName,
              });
              openEditShopModal();
            }}
          >
            Edit
          </a>
          {/* <Popconfirm
            title={`Are you sure you want to delete ${record.sName}`}
            onConfirm={() => {
              onDeleteShop(record.sID, record.sName);
            }}
            okText="Yes"
            cancelText="No"
          >
            <a>Delete</a>
          </Popconfirm> */}
        </Space>
      ),
    },

    // {
    //   title: "Action",
    //   key: "action",
    //   render: (text, record) => (
    //     <Space size="middle">
    //       <a
    //         onClick={() => {
    //           setShopEdit({
    //             sID: record.sID,
    //             sName: record.sName,
    //           });
    //           openEditShopModal();
    //         }}
    //       >
    //         Edit
    //       </a>
    //       <Popconfirm
    //         title={`Are you sure you want to delete ${record.sName}`}
    //         onConfirm={() => {
    //           onDeleteShop(record.sID, record.sName);
    //         }}
    //         okText="Yes"
    //         cancelText="No"
    //       >
    //         <a>Delete</a>
    //       </Popconfirm>
    //     </Space>
    //   ),
    // },
  ];

  // To convert BLOB to base64 encoded then load the base64 image STEP
  const convertToBase64 = (imgData) => {
    const imageBuffer = Buffer.from(imgData);
    const imageBuffer64 = imageBuffer.toString("base64");

    return imageBuffer64;
  };

  function getKeyByValue(value) {
    for (var i = 0; i < ShopArray.length; i++) {
      if (ShopArray[i].sName === value) {
        return i + 1;
      }
    }
  }

  const getProducts = async () => {
    setIsTableLoading(true);

    var catid = getKeyByValue(type);
    // console.log(catid);

    const res = await Utils.getProducts(catid);

    res.forEach((obj) => {
      setProductArray((prevArray) => [
        ...prevArray,
        {
          pID: obj.productid,
          pName: obj.productname,
          pDesc: obj.productdesc,
          pPrice: obj.price,
          pImage: {
            data: obj.image.data,
            type: obj.image.type,
            imageid: obj.imageid,
          },
          pURL: obj.url,
        },
      ]);
    });
    setIsTableLoading(false);
  };

  useEffect(() => {
    if (type !== "Shops") {
      setProductArray([]);
      getProducts();
    }
  }, [render, type]);

  // Get Shops for shops table
  const getShops = async () => {
    setIsTableLoading(true);
    const endpoint = "getShops";
    const res = await Utils.getApi(endpoint, {});
    // console.log(res);

    res.forEach((obj, i) => {
      setShopArray((prevArray) => [
        ...prevArray,
        {
          sID: obj.catid,
          sName: obj.catname,
        },
      ]);
    });
    setIsTableLoading(false);
  };

  // GET SHOPS TABLE, ADD OR DELETE SHOP DETAILS
  useEffect(() => {
    setShopArray([]);
    getShops();
  }, [render]);

  //----------------------------------------SHOPS----------------------------------------
  // ADD AND POST SHOPS FUNCTONS
  // const openAddShopModal = () => {
  //   setIsModalOpen(true);
  //   setIsAddShopModalVisible(true);
  // };
  // const cancelAddShopModal = () => {
  //   setIsModalOpen(false);
  //   setIsAddShopModalVisible(false);
  // };
  // const postAddShopModal = (values) => {
  //   setIsModalOpen(false);
  //   setIsAddShopModalVisible(false);

  //   Utils.postApi("createShopTable", values).then((res) => {
  //     // console.log(res);
  //     if (res.status === 201) {
  //       Utils.postApi("addShop", values).then((res) => {
  //         // console.log(res);
  //         if (res.status === 201) {
  //           message.success("Successfully added shop");
  //           setRender(!render);
  //         }
  //       });
  //     }
  //   });
  // };

  // EDIT AND POST SHOP FUNCTION
  const openEditShopModal = () => {
    setIsModalOpen(true);
    setIsEditShopModalVisible(true);
  };
  const cancelEditShopModal = () => {
    setIsModalOpen(false);
    setIsEditShopModalVisible(false);
  };
  const postEditShopModal = (values) => {
    setIsModalOpen(false);
    setIsEditShopModalVisible(false);

    // console.log(values);

    // shopEdit refers to the old value, values refer to new values from form
    Utils.putApi("editShop", {
      newName: values.sName,
      id: shopEdit.sID,
    })
      .then((res) => {
        console.log(res);
        if (res.data.affectedRows === 1) {
          console.log("Successfully edited shop's name");
          setRender(!render);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // // DELETE AND POST SHOP FUNCTION
  // const onDeleteShop = (id, sName) => {
  //   // console.log(id, sName);
  //   // console.log(typeof id, typeof sName);
  //   const params = {
  //     sID: id,
  //     sName: sName,
  //   };

  //   Utils.deleteApi("dropProductTable", params).then((res) => {
  //     console.log("success!");
  //     // console.log(res);
  //     if (res.status === 200) {
  //       Utils.deleteApi("deleteShop", params).then((res) => {
  //         // console.log(res);
  //         if (res.data.affectedRows === 1) {
  //           message.success("Successfully deleted shop");
  //           setRender(!render);
  //         }
  //       });
  //     }
  //   });
  // };

  //-------------------------------------------- PRODUCTS --------------------------------------------
  // ADD AND POST PRODUCTS FUNCTONS
  const openAddProductModal = () => {
    setIsAddProdModalVisible(true);
  };

  const cancelAddProductModal = () => {
    setIsAddProdModalVisible(false);
  };

  const postAddProductModal = async (values) => {
    setIsTableLoading(true);
    setIsAddProdModalVisible(false);
    values.shop = type;
    // console.log(type);
    // console.log(values);
    var thisProductId = 0;

    var postBody = {
      productname: values.pName,
      productdesc: values.pDesc,
      price: values.pPrice,
      url: values.pUrl,
      fk_catid: getKeyByValue(values.shop),
    };

    // console.log(postBody);

    await Utils.postApi("addProduct", postBody).then((response) => {
      if (response.status === 201) {
        thisProductId = response.data.insertId;
        message.success("Successfully added product!");
      }
    });

    var files = values.pImage;
    // console.log(files);

    for (var i = 0; i < files.length; i++) {
      let imageBody = {
        image: convertToBlob(files[i]),
        productid: thisProductId,
        imageid: files[i].imageid,
        identityid: i + 1,
      };

      Utils.postImageApi("addImage", imageBody).then((res) => {
        // console.log(res);
        if (res.status === 201) {
          console.log(res.data.affectedRows);
          message.success(`Successfully uploaded image`);
          setRender(!render);
        }
      });
    }

    setIsTableLoading(false);
  };

  const convertToBlob = (file) => {
    // if file is empty, throw a new error
    if (!file) {
      throw new Error("No image selected.");
    }

    // If there's an image, proceed to convert
    // Safe to do this since base64 encoded string will never have ',' within it
    const byteCharacters = atob(file.thumbUrl.split(",")[1]);

    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }

    const byteArray = new Uint8Array(byteNumbers);

    return new Blob([byteArray], { type: "image/png" });
  };

  // EDIT AND POST PRODUCT FUNCTION
  const openEditProductModal = () => {
    setIsModalOpen(true);
    setIsEditProdModalVisible(true);
  };

  const cancelEditProductModal = () => {
    setIsModalOpen(false);
    setIsEditProdModalVisible(false);
  };

  const postEditProductModal = (values) => {
    setIsModalOpen(false);
    setIsEditProdModalVisible(false);
    values.shop = type;
    values.id = curProdDetails.pID;
    // console.log(curProdDetails);

    var catid = getKeyByValue(type);

    var formBody = {
      productname: values.pName,
      productdesc: values.pDesc,
      price: values.pPrice,
      url: values.pUrl,
      fk_catid: catid,
      productid: values.id,
    };
    // console.log(formBody);

    Utils.patchApi("editProduct", formBody).then((res) => {
      // console.log(res);
      if (res.status === 200) {
        console.log(res.data.affectedRows);
        message.success("Successfully edited product");
        setRender(!render);
      }
    });

    var files = values.pImage;

    for (var i = 0; i < files.length; i++) {
      let bodyFile = {
        image: convertToBlob(files[i]),
        productid: values.id,
        imageid: files[i].imageid,
        identityid: i + 1,
      };

      if (bodyFile.imageid === undefined) {
        // console.log("post");
        Utils.postImageApi("addImage", bodyFile).then((res) => {
          if (res.status === 201) {
            console.log(res.data.affectedRows);
            message.success(`Successfully uploaded image`);
            // setRender(!render);
          }
        });
      } else if (
        curProdDetails.pImage[i].status !== undefined &&
        files.length < curProdDetails.pImage.length
      ) {
        // console.log("delete image");
        let bodyFile = {
          imageID: files[i].imageid,
        };

        Utils.deleteApi("deleteImage", bodyFile).then((res) => {
          if (res.status === 204) {
            console.log(res.data.affectedRows);
            message.success(`Successfully uploaded image`);
            // setRender(!render);
          }
        });
      } else if (productImages[i] !== bodyFile.image.thumbUrl) {
        // console.log("patch");
        Utils.editImageApi("editImage", bodyFile).then((res) => {
          if (res.status === 200) {
            console.log(res.data.affectedRows);
            message.success(`Successfully uploaded image`);
            // setRender(!render);
          }
        });
      }

      setRender(!render);
    }
  };

  // DELETE AND POST PRODUCT FUNCTION
  const onDeleteProduct = (id) => {
    const endpoint = "deleteProduct";
    const params = { pID: id };

    Utils.deleteApi(endpoint, params).then((res) => {
      // console.log(res);
      if (res.status === 204) {
        message.success("Successfully deleted product");
        setRender(!render);
      }
    });
  };

  //SEARCH PRODUCTS
  const searchProducts = async (value) => {
    const endpoint = "search";
    let categoryId;

    // Get shop category
    switch (type.toLowerCase()) {
      case "masks":
        categoryId = 1;
        break;
      case "puppets":
        categoryId = 2;
        break;
      case "dolls":
        categoryId = 3;
        break;
      case "shirts":
        categoryId = 4;
        break;
      case "frames":
        categoryId = 5;
        break;
    }

    // Call API to fetch data
    var res = await Utils._getApi(endpoint, {
      categoryId: categoryId,
      searchQuery: value,
    });

    setRender(render);
    setProductArray([]);

    // If no products found
    if (res.status === 404) {
      console.log("No product matches query");
    } else {
      // Else, get results and concatenate to product array
      res = res.data;

      res.forEach((obj, i) => {
        setProductArray((prevArray) => [
          ...prevArray,
          {
            pID: obj.productid,
            pName: obj.productname,
            pDesc: obj.productdesc,
            pPrice: obj.price,
            pImage: obj.image,
            pURL: obj.url,
          },
        ]);
      });
    }
  };

  //---------------Get all product images when user clicks on 'View All' / 'Edit Product'------------------------
  // Function to get other images from backend
  // If going to open edit product modal, should also update the curProdDetails state
  const getProductDetails = async (curItem) => {
    try {
      var res = await Utils._getApi("getOtherImages", {
        productId: curItem.pID,
      });

      let imgsArr = [curItem.pImage];

      // If no results returned
      if (res.status === 404) {
        console.log("has no more images");
      } else {
        res = res.data;
        for (let imgData of res) {
          console.log(res);
          var newImgData = {
            type: imgData.image.type,
            data: imgData.image.data,
            imageid: imgData.imageid,
          };
          imgsArr.push(newImgData);
        }
      }

      setCurProdDetails({
        pID: curItem.pID,
        pName: curItem.pName,
        pDesc: curItem.pDesc,
        pPrice: curItem.pPrice,
        pImage: imgsArr,
        pURL: curItem.pURL,
      });

      const convertedImgsArr = [];
      for (let img of imgsArr) {
        convertedImgsArr.push(
          `data:image/jpg;base64,${convertToBase64(img.data)}`
        );
      }
      setProductImages(convertedImgsArr);
    } catch (err) {
      console.log(err);
    }
  };

  // trigger loading of other images whenever user clicks on 'View All'
  useEffect(() => {
    getProductDetails(curProductSelected);
  }, [curProductSelected]);

  useEffect(() => {
    if (!firstRender && !isImageModalVisible) {
      openEditProductModal();
    }
  }, [curProdDetails]);

  //----------------------------------------DOWNLOAD CSV----------------------------------------
  const downloadProductCSV = () => {
    const endpoint = "downloadProductCSV";
    Utils.getApi(
      endpoint,
      { shop: type },
      { headers: { "Access-Control-Expose-Headers": "Content-Disposition" } }
    ).then((res) => {
      console.log(res);
      if (res) {
        const filename = res.request.getResponseHeader("Content-Disposition");
        console.log(filename);
        const cleanFilename = filename.split(`"`)[1];
        // var filename = `ttc_products_${type}.csv`;
        const downloadUrl = window.URL.createObjectURL(new Blob([res.data]));
        const link = document.createElement("a");
        link.href = downloadUrl;
        link.setAttribute("download", cleanFilename);
        document.body.appendChild(link);
        link.click();
        link.remove();
        message.success("Successfully downloaded CSV!");
      }
    });
  };

  return (
    <>
      <CustomNavbar />
      <div className="shop-content">
        <h1 className="shop">Shops/{type}</h1>
        <Space direction="horizontal" size={50} style={{ marginBottom: 20 }}>
          <TypeDropdown type={type} setType={setType} render={render} />
          {type === "Shops" ? (
            <>
              {/* <CustomButton title="Add Shop" onClick={openAddShopModal} /> */}

              {isModalOpen ? (
                <EditShopModal
                  title="Edit Shop Details"
                  visible={isEditShopModalVisible}
                  onOk={postEditShopModal}
                  onCancel={cancelEditShopModal}
                  details={shopEdit}
                />
              ) : (
                <div></div>
              )}

              {/* <EditShopModal
                title="Edit Shop Details"
                visible={isEditShopModalVisible}
                onOk={postEditShopModal}
                onCancel={cancelEditShopModal}
                details={shopEdit}
              /> */}

              {/* <AddShopModal
                title="Add Shop Details"
                visible={isAddShopModalVisible}
                onOk={postAddShopModal}
                onCancel={cancelAddShopModal}
              /> */}
            </>
          ) : (
            <>
              <CustomSearchBar
                onSearch={searchProducts}
                title="Search Products"
              />
              <CustomButton
                title="Add Products"
                onClick={openAddProductModal}
              />
              <CustomButton title="Bulk Upload" />
              <CustomButton title="Download CSV" onClick={downloadProductCSV} />

              <AddProductModal
                title="Add Product Details"
                visible={isAddProdModalVisible}
                onOk={postAddProductModal}
                onCancel={cancelAddProductModal}
              />

              {isModalOpen ? (
                <EditProductModal
                  title="Edit Product Details"
                  visible={isEditProdModalVisible}
                  onOk={postEditProductModal}
                  onCancel={cancelEditProductModal}
                  details={curProdDetails}
                />
              ) : (
                <div></div>
              )}

              <ImagesModal
                onCloseModal={() => {
                  setIsImageModalVisible(false);
                }}
                images={productImages}
              />

              {/* <EditProductModal
                title="Edit Product Details"
                visible={isEditProdModalVisible}
                onOk={postEditProductModal}
                onCancel={cancelEditProductModal}
                details={curProdDetails}
              /> */}
            </>
          )}
        </Space>

        {type === "Shops" ? (
          <Table
            columns={shopColumn}
            dataSource={ShopArray}
            rowKey="sID"
            loading={{
              indicator: <Spin size="default"></Spin>,
              spinning: isTableLoading,
            }}
          />
        ) : (
          <Table
            columns={columns}
            dataSource={productArray}
            rowKey="pID"
            loading={{
              indicator: <Spin size="default"></Spin>,
              spinning: isTableLoading,
            }}
          />
        )}
      </div>
    </>
  );
}

export default ShopScreen;
