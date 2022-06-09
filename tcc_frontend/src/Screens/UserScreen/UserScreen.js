import React, { useState, useEffect } from "react";
import CustomNavbar from "../Components/CustomNavbar/CustomNavbar";
import { Table, Space, Tag, Popconfirm, message, Spin } from "antd";
import "antd/dist/antd.css";
import { Utils } from "../../Helper";
import "./UserScreen.css";
import CustomSearchBar from "../Components/CustomSearchBar/CustomSearchBar";
import CustomButton from "../Components/CustomButton/CustomButton";
import AddUserModal from "./AddUserModal/AddUserModal";
import EditUserModal from "./EditUserModal/EditUserModal";
import { useLocation } from "react-router-dom";

function UserScreen() {
  const location = useLocation();
  const currentUser = {
    name: JSON.parse(localStorage.getItem("user")),
    role: JSON.parse(localStorage.getItem("role")),
    id: JSON.parse(localStorage.getItem("id")),
  };
  const [userArray, setUserArray] = useState([]);
  const [render, setRender] = useState(false);
  const [userEdit, setUserEdit] = useState({});
  const [isEditUserModalVisible, setIsEditUserModalVisible] = useState(false);
  const [isAddUserModalVisible, setIsAddUserModalVisible] = useState(false);
  const [isTableLoading, setIsTableLoading] = useState(false);

  const columns = [
    {
      title: "ID",
      dataIndex: "uID",
      key: "uID",
    },
    {
      title: "Name",
      dataIndex: "uName",
      key: "uName",
    },
    {
      title: "Email",
      dataIndex: "uEmail",
      key: "uEmail",
    },
    {
      title: "Role",
      dataIndex: "uRole",
      key: "uRole",
      render: (uRole, record) => (
        <>
          {uRole === "master" ? (
            record.uName === currentUser.name ? (
              <Tag color="green" key={uRole}>
                {uRole.toUpperCase()}
              </Tag>
            ) : (
              <Tag color="geekblue" key={uRole}>
                {uRole.toUpperCase()}
              </Tag>
            )
          ) : record.uName === currentUser.name ? (
            <Tag color="green" key={uRole}>
              {uRole.toUpperCase()}
            </Tag>
          ) : (
            <Tag color="blue" key={uRole}>
              {uRole.toUpperCase()}
            </Tag>
          )}
        </>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <Space size="middle">
          {currentUser.role === "master" ? (
            <a
              onClick={() => {
                setUserEdit({
                  uID: record.uID,
                  uName: record.uName,
                  uPass: record.uPass,
                  uEmail: record.uEmail,
                  uRole: record.uRole,
                });
                openEditUserModal();
              }}
            >
              Edit
            </a>
          ) : currentUser.name === record.uName ? (
            <a
              onClick={() => {
                console.log(record);
                setUserEdit({
                  uID: record.uID,
                  uName: record.uName,
                  uPass: record.uPass,
                  uEmail: record.uEmail,
                  uRole: record.uRole,
                });
                openEditUserModal();
              }}
            >
              Edit
            </a>
          ) : (
            <></>
          )}

          {currentUser.role === "master" ? (
            currentUser.name === record.uName ? (
              <></>
            ) : (
              <Popconfirm
                title={`Are you sure you want to delete ${record.uName}`}
                onConfirm={() => {
                  onDeleteUser(record.uID);
                }}
                okText="Yes"
                cancelText="No"
              >
                <a>Delete</a>
              </Popconfirm>
            )
          ) : (
            <></>
          )}
        </Space>
      ),
    },
  ];

  const openAddUserModal = () => {
    setIsAddUserModalVisible(true);
  };
  const cancelAddUserModal = () => {
    setIsAddUserModalVisible(false);
  };
  const postAddUserModal = (values) => {
    setIsAddUserModalVisible(false);
    // console.log(values);
    Utils.postApi("addUser", values).then((res) => {
      // console.log(res);
      if (res.status === 201) {
        message.success("Successfully added user");
        setRender(!render);
      }
    });
  };

  const onDeleteUser = (id) => {
    const params = { uID: id };
    setRender(render);
    setUserArray([]);

    Utils.deleteApi("deleteUser", params).then((res) => {
      // console.log(res);

      if (res.status === 204) {
        message.success("Successfully deleted user");
        // setRender(!render);
        getUsers();
      }
    });
  };

  const getUsers = async () => {
    const endpoint = "getUsers";
    const res = await Utils.getApi(endpoint, { id: currentUser.id });

    res.forEach((obj, i) => {
      setUserArray((prevArray) => [
        ...prevArray,
        {
          uID: obj.id,
          uName: obj.username,
          uEmail: obj.email,
          uRole: obj.role,
        },
      ]);
    });
  };

  useEffect(() => {
    setUserArray([]);
    getUsers();
  }, [render]);

  //SEARCH PRODUCTS
  const searchUsers = async (value) => {
    // console.log("searching");
    // console.log(value);
    // console.log(searchQuery);
    const endpoint = "searchUsers";
    let res = await Utils.postApi(endpoint, { searchQuery: value });

    // console.log(res);
    res = res.data;
    setRender(render);
    setUserArray([]);

    res.forEach((obj, i) => {
      setUserArray((prevArray) => [
        ...prevArray,
        {
          uID: obj.id,
          uName: obj.username,
          uEmail: obj.email,
          uRole: obj.role,
        },
      ]);
    });
  };

  // EDIT AND POST USER FUNCTION
  const openEditUserModal = () => {
    setIsEditUserModalVisible(true);
  };
  const cancelEditUserModal = () => {
    setIsEditUserModalVisible(false);
  };
  const postEditUserModal = (values) => {
    values.id = userEdit.uID;
    Utils.patchApi("editUsers", values).then((res) => {
      // console.log('hello');
      // console.log(res);
      if (res.status === 200) {
        message.success("Successfully edited user");
        setRender(!render);
      }
    });
  };

  return (
    <>
      <CustomNavbar isLoggedIn={location.state.isLoggedIn} />
      <div className="user-table">
        <h1 className="shop">User Admin</h1>
        <Space direction="horizontal" size={20} style={{ marginBottom: 20 }}>
          <CustomSearchBar onSearch={searchUsers} title="Search users" />

          {currentUser.role === "master" ? (
            <>
              <div className="addAdminButton">
                <CustomButton title="Add Admin" onClick={openAddUserModal} />
              </div>

              <AddUserModal
                title="Add User Details"
                visible={isAddUserModalVisible}
                onOk={postAddUserModal}
                onCancel={cancelAddUserModal}
              />
              <EditUserModal
                title="Edit User Details"
                visible={isEditUserModalVisible}
                onOk={postEditUserModal}
                onCancel={cancelEditUserModal}
                details={userEdit}
              />
            </>
          ) : (
            <>
              <EditUserModal
                title="Edit User Details"
                visible={isEditUserModalVisible}
                onOk={postEditUserModal}
                onCancel={cancelEditUserModal}
                details={userEdit}
              />
            </>
          )}
        </Space>
        <Table
          columns={columns}
          dataSource={userArray}
          rowKey="uID"
          loading={{
            indicator: <Spin size="default"></Spin>,
            spinning: isTableLoading,
          }}
        />
      </div>
    </>
  );
}

export default UserScreen;
