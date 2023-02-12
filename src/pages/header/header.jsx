import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import "./header.css";
import { Layout, Menu } from "antd";
import { useState, useContext } from "react";
import { SettingOutlined } from "@ant-design/icons";
import { LoggedInContext } from "../../context/loggedInContext";
const { Header } = Layout;
function HeaderWrapper() {
  let [selectedKey, setSelectedKey] = useState("0");
  const { isLoggedIn } = useContext(LoggedInContext);
  const location = useLocation();
  const { pathname } = location;
  const splitLocation = pathname.split("/");
  let newKey;
  let currentpage = splitLocation[1];

  let login = {
    key: 1,
    label: <NavLink to={"/login"}>{"Login"}</NavLink>,
  };

  let logout = {
    key: 1,
    label: <NavLink to={"/logout"}>{"Logout"}</NavLink>,
  };

  let register = {
    key: 2,
    label: <NavLink to={"/register"}>{"Register"}</NavLink>,
  };

  let myProfile = {
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
  };

  const items = [
    {
      key: 0,
      label: <NavLink to={"/"}>{"View all"}</NavLink>,
    },
  ];

  // Hiding menu items based on logged in flag
  if (isLoggedIn) {
    items.push(myProfile, logout);
  } else {
    items.push(login, register);
  }

  // Workaround so we can set antd menu key to properly reflect React router active key
  if (currentpage === "") {
    newKey = "0";
  } else if (currentpage === "login") {
    newKey = login.key.toString();
  } else if (currentpage === "register") {
    newKey = register.key.toString();
  } else if (currentpage === "my-profile") {
    newKey = myProfile.key.toString();

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
