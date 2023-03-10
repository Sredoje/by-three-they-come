import { Input, Row, Col, Form, Button, message } from 'antd';
import { UserOutlined, LockOutlined, MailOutlined } from '@ant-design/icons';
import UserApi from '../../api/userApi';
import UserSessionHelper from '../../helpers/userSessionHelper';
import './register.css';
import React from 'react';
import LoggedInContext from '../../context/loggedInContext';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import PointsContext from '../../context/pointsContext';
function Register() {
  const [messageApi, contextHolder] = message.useMessage();
  const { setIsLoggedIn } = useContext(LoggedInContext);
  const { setPoints } = useContext(PointsContext);
  const navigate = useNavigate();

  const onFinish = (values) => {
    UserApi.createUser(values.username, values.password, values.email)
      .then((response) => {
        UserSessionHelper.setUser(response.user);
        UserSessionHelper.setToken(response.token);
        setPoints(response.user.points);
        messageApi.open({
          type: 'success',
          content: 'Sucesffully created account!' + values.username,
        });
        setIsLoggedIn(true);
        navigate('/');
      })
      .catch((error) => {
        messageApi.open({
          type: 'error',
          content: error.message,
        });
        setIsLoggedIn(false);
      });
  };
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <>
      {contextHolder}
      <Row align="center">
        <h2 className="registerHeader">
          Register for free and get 2000 points for unlocking images!
        </h2>
      </Row>
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
                  message: 'Please input your username!',
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
                  type: 'email',
                  message: 'The input is not valid E-mail!',
                },
                {
                  required: true,
                  message: 'Please input your E-mail!',
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
                  message: 'Please input your password!',
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
              dependencies={['password']}
              hasFeedback
              rules={[
                {
                  required: true,
                  message: 'Please confirm your password!',
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('password') === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      new Error(
                        'The two passwords that you entered do not match!'
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
export default Register;
