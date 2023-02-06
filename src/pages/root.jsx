import React from "react";
import HeaderWrapper from "./header/header";
import FooterWrapper from "./footer/footer";
import { Outlet } from "react-router-dom";
import { Layout } from "antd";
const { Content } = Layout;
export default function Root() {
  return (
    <>
      <Layout>
        <HeaderWrapper></HeaderWrapper>
        <Layout>
          <Content className="content">
            <Outlet />
          </Content>
        </Layout>
        {/* <FooterWrapper></FooterWrapper> */}
      </Layout>
    </>
  );
}
