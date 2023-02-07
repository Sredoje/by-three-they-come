import React from "react";
import { NavLink } from "react-router-dom";
import "./header.css";
import { Layout, Menu } from "antd";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import { SettingOutlined } from "@ant-design/icons";
const { Header } = Layout;
function HeaderWrapper() {
  let [selectedKey, setSelectedKey] = useState("0");
  const location = useLocation();
  const { pathname } = location;
  const splitLocation = pathname.split("/");
  let newKey;
  let currentpage = splitLocation[1];
  // Workaround so we can set antd menu key to properly reflect React router active key
  if (currentpage === "") {
    newKey = "0";
  } else if (currentpage === "login") {
    newKey = "1";
  } else if (currentpage === "register") {
    newKey = "2";
  } else if (currentpage === "my-profile") {
    newKey = "3";

    let subNode = splitLocation[2];
    if (subNode) {
      if (subNode === "account-info") {
        newKey = "myProfile:account-info";
      }
      if (subNode === "upload-pictures") {
        newKey = "myProfile:upload-pictures";
      }
      if (subNode === "reports") {
        newKey = "myProfile:reports";
      }
    }
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
    {
      key: 3,
      label: "My Profile",
      icon: <SettingOutlined />,
      children: [
        {
          label: (
            <NavLink to={"/my-profile/account-info"}>{"Account info"}</NavLink>
          ),
          key: "myProfile:account-info",
        },
        {
          label: (
            <NavLink to={"/my-profile/upload-pictures"}>
              {"Upload pictures"}
            </NavLink>
          ),
          key: "myProfile:upload-pictures",
        },
        {
          label: <NavLink to={"/my-profile/reports"}>{"Report"}</NavLink>,
          key: "myProfile:reports",
        },
      ],
    },
  ];
  const onClick = (e) => {
    console.log("click ", e);
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
