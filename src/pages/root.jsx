import React from 'react';
import HeaderWrapper from './header/header';
import FooterWrapper from './footer/footer';
import { Outlet } from 'react-router-dom';
import { Layout, ConfigProvider } from 'antd';
import { LoggedInContext } from '../context/loggedInContext';
import { useState } from 'react';
import UserSessionHelper from '../helpers/userSessionHelper';
import PointsContext from '../context/pointsContext';
const { Content } = Layout;
export default function Root() {
  // https://codesandbox.io/s/react-context-4c174?file=/src/LanguageSwitcher.js
  // Contextg is just like state that can be accessed anywhere, we use setter to set it, and it rerenders proper components
  const [isLoggedIn, setIsLoggedIn] = useState(UserSessionHelper.isLoggedIn());
  const value = { isLoggedIn, setIsLoggedIn };
  const [points, setPoints] = useState(UserSessionHelper.getPoints());
  const pointsValue = { points, setPoints };
  return (
    <>
      <PointsContext.Provider value={pointsValue}>
        <LoggedInContext.Provider value={value}>
          <ConfigProvider
            theme={{
              token: {
                colorPrimary: '#EC9706',
              },
            }}
          >
            <Layout>
              <HeaderWrapper></HeaderWrapper>
              <Layout>
                <Content className="content">
                  <Outlet />
                </Content>
              </Layout>
              <FooterWrapper></FooterWrapper>
            </Layout>
          </ConfigProvider>
        </LoggedInContext.Provider>
      </PointsContext.Provider>
    </>
  );
}
