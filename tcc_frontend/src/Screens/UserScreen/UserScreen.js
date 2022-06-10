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
import { useLocation, useNavigate } from "react-router-dom";

function UserScreen() {
  const location = useLocation();
  const navigate = useNavigate();
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

  const checkErrorHandler = (res, requiresAuth) => {
    // if there are no errors, res would not have .message property => return immediately
    if (!res.message) {
      return true;
    }

    // if the API call requires authentication, possibly encouter not authenticated error => return unauthenticated error
    if (requiresAuth && res.message === "Unauthenticated") {
      navigate("/login", {
        state: {
          isLoggedIn: false,
          isAuthenticated: false,
          message: "User not authenticated. Please log in again.",
        },
        replace: true,
      });
    }

    // if the error is an unknown server error => return unknown error
    if (res.message === "Unknown error") {
      message.error("Something went wrong. Please try again later");
    }
    return false;
  };

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
    Utils.postApi("addUser", values)
      .then((res) => {
        if (checkErrorHandler(res, true)) {
          // in the case where adding is successful
          if (res.status === 201) {
            message.success("Successfully added user");
          }
        }
      })
      .then((result) => {
        setRender(!render);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const onDeleteUser = (id) => {
    const params = { uID: id };
    setRender(render);
    setUserArray([]);

    Utils.deleteApi("deleteUser", params).then((res) => {
      if (checkErrorHandler(res, true)) {
        // in the case where deleting is successful
        if (res.status === 204) {
          message.success("Successfully deleted user");
          // setRender(!render);
          getUsers();
        }
      }
    });
  };

  const getUsers = () => {
    const endpoint = "getUsers";
    Utils.getApi(endpoint, { id: currentUser.id }).then((res) => {
      if (checkErrorHandler(res, true)) {
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
      }
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
    await Utils.postApi(endpoint, { searchQuery: value }).then((res) => {
      if (checkErrorHandler(res, true)) {
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
      }
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
    setIsEditUserModalVisible(false);
    values.id = userEdit.uID;
    Utils.patchApi("editUsers", values).then((res) => {
      if (checkErrorHandler(res, true)) {
        // in the case where user edited successfully
        if (res.status === 200) {
          message.success("Successfully edited user");
          setRender(!render);
        }
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
                canEditRole={currentUser.role === "master" ? true : false}
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
