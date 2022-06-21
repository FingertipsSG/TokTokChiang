import React, { useEffect, useState } from 'react';
import { Menu, Dropdown, Space, Button, message } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { Utils } from '../../../Helper';

function TypeDropdown({ type, setType, render }) {
  const [ShopArray, setShopArray] = useState([{ label: "shops", key: "shops" }]);

  const handleTypeClick = (e) => {
    setType(e.key);
  };

  useEffect(() => {
    const getShops = async () => {
      const endpoint = "getShops";
      const res = await Utils.getApi(endpoint, {});
      // console.log(res);

      res.forEach((obj) => {
        setShopArray((prevArray) => [
          ...prevArray, {
            label: obj.catname,
            key: obj.catname,
            id: obj.catid
          }
        ]);
      });
    };
    setShopArray([{ label: "Shops", key: "Shops" }]);
    getShops();
  }, [render]);


  const types = (
    <Menu
      onClick={handleTypeClick}
      items={ShopArray}
    />
  );

  return (
    <Dropdown overlay={types}>
      <Button>
        <Space>
          {type}
          <DownOutlined />
        </Space>
      </Button>
    </Dropdown>
  );
}

export default TypeDropdown;