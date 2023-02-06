import React from "react";
import { Link } from "react-router-dom";
import './header.css'
import { Layout, Menu } from 'antd';
const { Header  } = Layout;
function HeaderWrapper() {
  const items = [{
    key: 0,
     label: <Link to={'/login'}>{'Login'}</Link>
  },
  { 
    key: 1,
    label: <Link to={'/Register'}>{'Register'}</Link>
  }]
  return (
    <Header className='header'>
      <div className="logo" />
      <Menu
        theme="dark"
        mode="horizontal"
        items={items}
      >
      </Menu>
    </Header>
  )
}
export default HeaderWrapper;