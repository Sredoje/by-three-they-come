import React from "react";
import { NavLink } from "react-router-dom";
import "./header.css";
import { Layout, Menu } from "antd";
import { useLocation } from "react-router-dom";
import { useState } from "react";
const { Header } = Layout;
function HeaderWrapper() {
  let [selectedKey, setSelectedKey] = useState("0");
  const location = useLocation();
  const { pathname } = location;
  const splitLocation = pathname.split("/");
  let newKey;
  // Workaround so we can set antd menu key to properly reflect React router active key
  if (splitLocation[1] === "") {
    newKey = "0";
  } else if (splitLocation[1] === "login") {
    newKey = "1";
  } else if (splitLocation[1] === "register") {
    newKey = "2";
  }
  if (newKey !== selectedKey) {
    setSelectedKey(newKey);
  }

  const items = [
    {
      key: 0,
      label: <NavLink to={"/"}>{"View all"}</NavLink>,
    },
    {
      key: 1,
      label: <NavLink to={"/login"}>{"Login"}</NavLink>,
    },
    {
      key: 2,
      label: <NavLink to={"/register"}>{"Register"}</NavLink>,
    },
  ];

  return (
    <Header className="header">
      <div className="logo" />
      <Menu
        theme="dark"
        mode="horizontal"
        items={items}
        selectedKeys={[selectedKey]} // Set default key by figuring out what ise selected
      ></Menu>
    </Header>
  );
}
export default HeaderWrapper;
