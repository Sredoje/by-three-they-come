import { Form, Input, Button, Row, Col, message } from 'antd';
import { MailOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import EmailApi from '../../api/emailApi';
import './contactUs.css';

function ContactUs() {
  const { success } = message;
  const navigate = useNavigate();
  const onFinish = (data) => {
    success('Message sent!');
    navigate('/');
    EmailApi.submitFeedback(data.email, data.body, data.subject);
  };
  return (
    <>
      <Row align="center">
        <h2 className="contactUsHeader">
          Contact us if you have any questions or bugs to report
        </h2>
      </Row>
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
              <Button
                type="primary"
                htmlType="submit"
                className="contactUsSubmit"
              >
                Submit
              </Button>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </>
  );
}

export default ContactUs;
