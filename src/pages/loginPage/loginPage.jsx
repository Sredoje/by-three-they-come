import { Input, Row, Col, Form, Button } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
function LoginPage() {

    const onFinish = (values) => {
                console.log('Success:', values);
      };
      const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
      };
    return (
        <>
        
            <Row align="center">
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
                            <Input size="large" placeholder="Username" prefix={<UserOutlined />}/>
                            </Form.Item>

                            <Form.Item
                            name="password"
                            rules={[
                                {
                                required: true,
                                message: 'Please input your password!',
                                },
                            ]}
                            >
                            <Input.Password size="large" placeholder="Password" prefix={<LockOutlined />}/>
                            </Form.Item>
                            <Form.Item
                            >
                                <Button type="primary" htmlType="submit">
                                    Login
                                </Button>
                            </Form.Item>
                    </Form>
                </Col>
            </Row>  
        </> 
    )
}
export default LoginPage;