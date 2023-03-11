import { Form, Input, Button, Row, Col, message } from 'antd';
import { MailOutlined } from '@ant-design/icons';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import EmailApi from '../../api/emailApi';

function ContactUs() {
  const [submited, setSubmited] = useState(false);
  const { success } = message;
  const navigate = useNavigate();
  const onFinish = (data) => {
    setSubmited(true);
    success('Message sent!');
    navigate('/');
    console.log(data);
    EmailApi.submitFeedback(data.email, data.body, data.subject);
  };
  return (
    <Row align="center" className="loginRow">
      <Col span={5}>
        <h2>Contact us</h2>
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
              prefix={<MailOutlined></MailOutlined>}
            />
          </Form.Item>

          <Form.Item
            name="subject"
            rules={[
              {
                required: true,
                message: 'Subject is required!',
              },
            ]}
          >
            <Input size="large" placeholder="Subject" />
          </Form.Item>
          <Form.Item
            name="body"
            rules={[
              {
                required: true,
                message: 'Message is required!!',
              },
            ]}
          >
            <Input.TextArea placeholder="Message" size="large" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" disabled={submited}>
              {submited ? 'Submit message' : 'Message sent'}
            </Button>
          </Form.Item>
        </Form>
      </Col>
    </Row>
  );
}

export default ContactUs;
