import { Input, Row, Col, Form, Button, Checkbox, message } from "antd";
import { LockOutlined, MailOutlined } from "@ant-design/icons";
import "./loginPage.css";
import { useContext } from "react";
import { LoggedInContext } from "../../context/loggedInContext";
import { useNavigate } from "react-router-dom";
import UserSessionHelper from "../../helpers/userSessionHelper";
import UserApi from "../../api/userApi";
function LoginPage() {
  const { isLoggedIn, setIsLoggedIn } = useContext(LoggedInContext);
  const [messageApi, contextHolder] = message.useMessage();
  const navigate = useNavigate();
  if (isLoggedIn) {
    navigate("/");
  }
  const onFinish = (values) => {
    UserApi.loginUser(values.email, values.password)
      .then((response) => {
        UserSessionHelper.setUser(response.user);
        UserSessionHelper.setToken(response.token);
        messageApi.open({
          type: "success",
          content: "Success! Happy Browsing",
        });
        setIsLoggedIn(true);
        navigate("/");
      })
      .catch((error) => {
        messageApi.open({
          type: "error",
          content: "Wrong email or password combination!",
        });
        setIsLoggedIn(false);
      });
  };

  return (
    <>
      {contextHolder}
      <Row align="center" className="loginRow">
        <Col>
          <Form
            name="basic"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            autoComplete="off"
          >
            <Form.Item
              name="email"
              rules={[
                {
                  type: "email",
                  message: "The input is not valid E-mail!",
                },
                {
                  required: true,
                  message: "Please input your E-mail!",
                },
              ]}
            >
              <Input
                size="large"
                placeholder="Email"
                prefix={<MailOutlined></MailOutlined>}
              />
            </Form.Item>

            <Form.Item
              name="password"
              rules={[
                {
                  required: true,
                  message: "Please input your password!",
                },
              ]}
            >
              <Input.Password
                size="large"
                placeholder="Password"
                prefix={<LockOutlined />}
              />
            </Form.Item>
            <Form.Item>
              <Form.Item name="remember" valuePropName="checked" noStyle>
                <Checkbox>Remember me</Checkbox>
              </Form.Item>

              <a className="login-form-forgot" href="">
                Forgot password
              </a>
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button"
              >
                Log in
              </Button>
              Or <a href="/register">register now!</a>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </>
  );
}
export default LoginPage;
