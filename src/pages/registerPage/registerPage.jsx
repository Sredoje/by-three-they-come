import { Input, Row, Col, Form, Button, message } from "antd";
import { UserOutlined, LockOutlined, MailOutlined } from "@ant-design/icons";
import UserApi from "../../api/userApi";
import UserSessionHelper from "../../helpers/userSessionHelper";
import "./registerPage.css";
function RegisterPage() {
  const [messageApi, contextHolder] = message.useMessage();

  const onFinish = (values) => {
    UserApi.createUser(values.username, values.password, values.email)
      .then((response) => {
        console.log(response);
        UserSessionHelper.setUser(response.user);
        UserSessionHelper.setToken(response.token);
        console.log("IME JE", UserSessionHelper.getName());
        messageApi.open({
          type: "success",
          content: "Sucesffully created user: " + values.username,
        });
      })
      .catch((error) => {
        messageApi.open({
          type: "error",
          content: error.message,
        });
      });
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <>
      {contextHolder}
      <Row align="center" className="registerRow">
        <Col>
          <Form
            name="basic"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item
              name="username"
              rules={[
                {
                  required: true,
                  message: "Please input your username!",
                },
              ]}
            >
              <Input
                size="large"
                placeholder="Username"
                prefix={<UserOutlined />}
              />
            </Form.Item>
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
                prefix={<MailOutlined />}
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
              hasFeedback
            >
              <Input.Password
                size="large"
                placeholder="Password"
                prefix={<LockOutlined />}
              />
            </Form.Item>

            <Form.Item
              name="confirm"
              dependencies={["password"]}
              hasFeedback
              rules={[
                {
                  required: true,
                  message: "Please confirm your password!",
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("password") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      new Error(
                        "The two passwords that you entered do not match!"
                      )
                    );
                  },
                }),
              ]}
            >
              <Input.Password
                size="large"
                placeholder="Confirm Password"
                prefix={<LockOutlined />}
              />
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="register-form-button"
              >
                Register
              </Button>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </>
  );
}
export default RegisterPage;
