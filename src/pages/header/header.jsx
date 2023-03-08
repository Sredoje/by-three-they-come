import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import './header.css';
import { Layout, Menu } from 'antd';
import { useState, useContext } from 'react';
import { SettingOutlined } from '@ant-design/icons';
import { LoggedInContext } from '../../context/loggedInContext';
import UserSessionHelper from '../../helpers/userSessionHelper';
import PointsContext from '../../context/pointsContext';
const { Header } = Layout;
function HeaderWrapper() {
  let [selectedKey, setSelectedKey] = useState('0');
  const { isLoggedIn } = useContext(LoggedInContext);
  const { points } = useContext(PointsContext);
  const location = useLocation();
  const { pathname } = location;
  const splitLocation = pathname.split('/');
  let newKey;
  let currentpage = splitLocation[1];

  let login = {
    key: 1,
    label: <NavLink to={'/login'}>{'Login'}</NavLink>,
  };

  let logout = {
    key: 1,
    label: <NavLink to={'/logout'}>{'Logout'}</NavLink>,
  };

  let register = {
    key: 2,
    label: <NavLink to={'/register'}>{'Register'}</NavLink>,
  };

  const newPost = {
    label: <NavLink to={'/my-profile/new-post'}>{'New Post'}</NavLink>,
    key: 'myProfile:new-post',
  };
  const reports = {
    label: <NavLink to={'/my-profile/reports'}>{'Report'}</NavLink>,
    key: 'myProfile:reports',
  };
  const myPosts = {
    label: <NavLink to={'/my-profile/my-posts'}>{'My Posts'}</NavLink>,
    key: 'myProfile:my-posts',
  };
  const purchasedItems = {
    label: (
      <NavLink to={'/my-profile/purchased-items'}>{'Purchased Items'}</NavLink>
    ),
    key: 'myProfile:purchased-items',
  };
  let myProfile = {
    key: 3,
    label: 'My Profile',
    icon: <SettingOutlined />,
    children: [
      {
        label: (
          <NavLink to={'/my-profile/account-info'}>{'Account info'}</NavLink>
        ),
        key: 'myProfile:account-info',
      },
    ],
  };

  let currentPoints = {
    key: 4,
    label: 'Points: ' + points,
  };
  const items = [
    {
      key: 0,
      label: <NavLink to={'/'}>{'View all'}</NavLink>,
    },
  ];

  // Hiding menu items based on logged in flag
  if (isLoggedIn) {
    myProfile.children.push(purchasedItems);
    if (UserSessionHelper.isAdmin()) {
      myProfile.children.push(newPost, myPosts, reports);
    }
    items.push(myProfile, logout);
    items.push(currentPoints);
  } else {
    items.push(login, register);
  }

  // Workaround so we can set antd menu key to properly reflect React router active key
  if (currentpage === '') {
    newKey = '0';
  } else if (currentpage === 'login') {
    newKey = login.key.toString();
  } else if (currentpage === 'register') {
    newKey = register.key.toString();
  } else if (currentpage === 'my-profile') {
    newKey = myProfile.key.toString();

    let subNode = splitLocation[2];
    if (subNode) {
      newKey = 'myProfile:' + subNode;
    }
  }
  if (newKey !== selectedKey) {
    setSelectedKey(newKey);
  }
  const onClick = (e) => {
    setSelectedKey(e.key);
  };

  return (
    <Header className="header">
      <div className="logo" />
      <Menu
        theme="dark"
        mode="horizontal"
        items={items}
        selectedKeys={[selectedKey]}
        onClick={onClick}
      ></Menu>
    </Header>
  );
}
export default HeaderWrapper;
