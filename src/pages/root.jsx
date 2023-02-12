import React from "react";
import HeaderWrapper from "./header/header";
import FooterWrapper from "./footer/footer";
import { Outlet } from "react-router-dom";
import { Layout } from "antd";
import { LoggedInContext } from "../context/loggedInContext";
import UserSessionHelper from "../helpers/userSessionHelper";
import { useState } from "react";
const { Content } = Layout;
export default function Root() {
  // https://codesandbox.io/s/react-context-4c174?file=/src/LanguageSwitcher.js
  // Contextg is just like state that can be accessed anywhere, we use setter to set it, and it rerenders proper components
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const value = { isLoggedIn, setIsLoggedIn };
  return (
    <>
      <LoggedInContext.Provider value={value}>
        <Layout>
          <HeaderWrapper></HeaderWrapper>
          <Layout>
            <Content className="content">
              <Outlet />
            </Content>
          </Layout>
          <FooterWrapper></FooterWrapper>
        </Layout>
      </LoggedInContext.Provider>
    </>
  );
}
