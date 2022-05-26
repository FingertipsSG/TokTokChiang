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
// import AddShopModal from "./AddShopModal/AddShopModal";

function ShopScreen() {
  const [type, setType] = useState("Shops");
  const [productArray, setProductArray] = useState([]);
  const [ShopArray, setShopArray] = useState([]);
  const [prodEdit, setProdEdit] = useState({});
  const [shopEdit, setShopEdit] = useState({});
  const [isAddProdModalVisible, setIsAddProdModalVisible] = useState(false);
  const [isEditProdModalVisible, setIsEditProdModalVisible] = useState(false);
  const [isAddShopModalVisible, setIsAddShopModalVisible] = useState(false);
  const [isEditShopModalVisible, setIsEditShopModalVisible] = useState(false);
  const [render, setRender] = useState(false);
  const [isTableLoading, setIsTableLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

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
        // console.log(props);
        // console.log("testing", props.pImage.data)
        return (
          <img
            className="image"
            src={`data:image/jpg;base64,${convertToBase64(props.pImage.data)}`}
          />
        );
      },
    },
    {
      title: "Buy URL",
      dataIndex: "pURL",
      key: "pURL",
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <Space size="middle">
          <a
            onClick={() => {
              setProdEdit({
                pID: record.pID,
                pName: record.pName,
                pDesc: record.pDesc,
                pPrice: record.pPrice,
                pImage: record.pImage,
                pURL: record.pURL,
              });
              openEditProductModal();
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
          <Popconfirm
            title={`Are you sure you want to delete ${record.sName}`}
            onConfirm={() => {
              onDeleteShop(record.sID, record.sName);
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
    // console.log(res);

    res.forEach((obj) => {
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

    console.log(productArray);

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
          sName: obj.catname
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
    values.oldShop = shopEdit.sName;
    values.id = shopEdit.sID;
    // console.log(values)

    Utils.putApi("alterTable", values).then((res) => {
      console.log(res);
      if (res.status === 204) {
        Utils.patchApi("editShop", values).then((res) => {
          console.log(res);
          if (res.affectedRows === 1) {
            message.success("Successfully edited shop");
            setRender(!render);
          }
        });
      }
    });
  };

  // DELETE AND POST SHOP FUNCTION
  const onDeleteShop = (id, sName) => {
    // console.log(id, sName);
    // console.log(typeof id, typeof sName);
    const params = {
      sID: id,
      sName: sName,
    };

    Utils.deleteApi("dropProductTable", params).then((res) => {
      console.log("success!");
      // console.log(res);
      if (res.status === 200) {
        Utils.deleteApi("deleteShop", params).then((res) => {
          // console.log(res);
          if (res.data.affectedRows === 1) {
            message.success("Successfully deleted shop");
            setRender(!render);
          }
        });
      }
    });
  };

  //-------------------------------------------- PRODUCTS --------------------------------------------
  // ADD AND POST PRODUCTS FUNCTONS
  const openAddProductModal = () => {
    setIsAddProdModalVisible(true);
  };

  const cancelAddProductModal = () => {
    setIsAddProdModalVisible(false);
  };

  const postAddProductModal = (values) => {
    setIsAddProdModalVisible(false);
    values.shop = type;

    Utils.postFormApi("addProduct", values).then((response) => {
      if (response.status === 201) {
        message.success("Successfully added product!");
        setRender(!render);
      }
    });
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
    values.id = prodEdit.pID;

    Utils.editFormApi("editProduct", values).then((res) => {
      // console.log(res);
      if (res.data.affectedRows === 1) {
        message.success("Successfully edited product");
        setRender(!render);
      }
    });
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
    const res = await Utils.getApi(endpoint, {
      shop: type,
      searchQuery: value,
    });
    // console.log(res);

    setRender(render);
    setProductArray([]);

    res.forEach((obj, i) => {
      setProductArray((prevArray) => [
        ...prevArray,
        {
          pID: obj.product_id,
          pName: obj.product_name,
          pDesc: obj.product_description,
          pPrice: obj.product_price,
          pImage: obj.product_image,
          pURL: obj.buy_url,
        },
      ]);
    });
  };

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
                  details={prodEdit}
                />
              ) : (
                <div></div>
              )}

              {/* <EditProductModal
                title="Edit Product Details"
                visible={isEditProdModalVisible}
                onOk={postEditProductModal}
                onCancel={cancelEditProductModal}
                details={prodEdit}
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
              spinning: isTableLoading
            }}
          />
        ) : (
          <Table
            columns={columns}
            dataSource={productArray}
            rowKey="pID"
            loading={{
              indicator: <Spin size="default"></Spin>,
              spinning: isTableLoading
            }}
          />
        )}
      </div>
    </>
  );
}

export default ShopScreen;
