import React from 'react';
import 'antd/dist/antd.css';
import { Input } from 'antd';


function CustomSearchBar({title, onSearch}) {
  const { Search } = Input;

  return (
    <Search placeholder={title} allowClear onSearch={onSearch} style={{width: 400}} />
  );
}

export default CustomSearchBar;