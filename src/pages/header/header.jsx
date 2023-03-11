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
    label: <NavLink to={'/buy-points'}>{'Points:' + points}</NavLink>,
  };

  let contactUs = {
    key: 5,
    label: <NavLink to={'/contact-us'}>{'Contact Us'}</NavLink>,
  };

  let buyPoints = {
    key: 6,
    label: <NavLink to={'/buy-points'}>{'Buy Points'}</NavLink>,
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
    items.push(buyPoints);
  } else {
    items.push(login, register);
  }

  items.push(contactUs);

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
  } else if (currentpage === 'contact-us') {
    newKey = contactUs.key.toString();
  } else if (currentpage === 'buy-points') {
    newKey = buyPoints.key.toString();
  }
  if (newKey !== selectedKey) {
    setSelectedKey(newKey);
  }
  const onClick = (e) => {
    setSelectedKey(e.key);
  };

  return (
    <Header className="header">
      <svg
        // width="100%"
        className="indexLogo"
        viewBox="221.47253054142323 140.61578657867562 107.05493891715349 130.90953615294353"
      >
        <g>
          <path
            d="M277.91556,236.68056c-0.28157,-0.14232 -0.43307,-0.45144 -0.37033,-0.75903c2.58053,-12.78957 -4.92754,-21.67859 -12.87848,-31.09172l-0.00964,-0.01147c-12.90037,-15.26773 -26.23534,-31.05576 7.36683,-64.00449c0.23873,-0.23873 0.62283,-0.26474 0.89675,-0.06121c0.27392,0.20353 0.35962,0.57539 0.202,0.87686c-7.51374,14.35568 0.0704,24.59487 8.09984,35.43393c10.7197,14.47198 22.86869,30.87672 -2.4806,59.45646c-0.13467,0.14997 -0.32442,0.23261 -0.51724,0.23261c-0.10559,0 -0.21118,-0.02449 -0.30912,-0.07192zM250.16203,207.54853l-0.00137,-0.00168c-8.69665,-10.84212 -16.9082,-21.08284 -12.79171,-33.57156c0.10253,-0.31218 -0.02601,-0.65343 -0.31218,-0.81718c-0.28464,-0.16221 -0.64425,-0.10406 -0.86309,0.14079c-10.52382,11.85671 -15.44983,24.39133 -14.63419,37.25498c1.57161,24.76932 24.19393,44.53917 32.71001,51.98098c0.7376,0.64425 1.37879,1.20434 1.90981,1.68332c0.12701,0.11324 0.29229,0.17598 0.46215,0.17598c0.02449,0 0.04744,0 0.07192,-0.00459c0.19588,-0.01989 0.37186,-0.12243 0.48969,-0.28157c18.20375,-25.07293 4.79242,-41.80025 -7.04103,-56.55947zM303.97951,183.29018c0.26474,-0.1867 0.6213,-0.1668 0.86002,0.04744c20.59162,18.26404 28.10689,38.38739 21.17313,56.66215c-6.82664,17.97482 -27.58506,31.52556 -48.28685,31.52556h-0.00612c-3.3743,0 -6.65678,-0.37033 -9.76173,-1.09416c-0.24026,-0.05662 -0.43307,-0.23413 -0.505,-0.46827c-0.07498,-0.23413 -0.01683,-0.48969 0.14844,-0.67027c3.60537,-3.9757 7.28726,-7.79837 10.85283,-11.4925l0.00321,-0.00336c20.88559,-21.65379 38.92361,-40.3552 25.28181,-73.6787c-0.12243,-0.29841 -0.02295,-0.64119 0.24026,-0.82789z"

            // style="fill: rgb(17, 17, 31);"
          ></path>
        </g>
      </svg>
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
