import { PlusOutlined } from '@ant-design/icons';
import { Modal, Upload, Row, Col, Button, Form, message } from 'antd';
import { useState } from 'react';
import PostApi from '../../../api/postApi';
import { useNavigate } from 'react-router-dom';

// Express side of upload https://github.com/react-component/upload/blob/master/server.js
// https://levelup.gitconnected.com/managing-file-uploads-with-ant-design-6d78e592f2c4
function CreateNewPost() {
  const navigate = useNavigate();
  const getBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  const [messageApi, contextHolder] = message.useMessage();
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [previewTitle, setPreviewTitle] = useState('');
  const [fileList, setFileList] = useState([]);

  let createNewPostDisabled = fileList.length < 3 ? true : false;
  const handleCancel = () => setPreviewOpen(false);
  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
    setPreviewTitle(
      file.name || file.url.substring(file.url.lastIndexOf('/') + 1)
    );
  };

  const handleFinish = async (values) => {
    let fileList = values.upload;
    if (!fileList) {
      return;
    }

    // 👇 Create new FormData object and append files
    const data = new FormData();

    fileList.map((file, i) => {
      data.append(`file-${i}`, file.originFileObj, file.name);
      return file;
    });

    await PostApi.createPost(data);
    messageApi.open({
      type: 'success',
      content: 'Sucesffully uploaded picture!',
    });
    navigate('/my-profile/my-posts');
  };
  const handleChange = ({ fileList: newFileList }) => setFileList(newFileList);

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div
        style={{
          marginTop: 8,
        }}
      >
        Upload
      </div>
    </div>
  );

  const dummyRequest = ({ file, onSuccess }) => {
    setTimeout(() => {
      onSuccess('ok');
    }, 0);
  };

  const normFile = (e) => {
    console.log('Upload event:', e);
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };
  return (
    <>
      {contextHolder}
      <Row align="center">
        <h1>Upload three pictures!</h1>
      </Row>
      <Form layout="horizontal" onFinish={handleFinish}>
        <Row align="center" className="registerRow">
          <Col align="center">
            <Form.Item
              valuePropName="fileList"
              getValueFromEvent={normFile}
              name="upload"
            >
              <Upload
                customRequest={dummyRequest}
                listType="picture-card"
                fileList={fileList}
                onPreview={handlePreview}
                onChange={handleChange}
                // multiple={true}
              >
                {fileList.length >= 3 ? null : uploadButton}
              </Upload>
            </Form.Item>
            <Modal
              open={previewOpen}
              title={previewTitle}
              footer={null}
              onCancel={handleCancel}
            >
              <img
                alt="example"
                style={{
                  width: '100%',
                }}
                src={previewImage}
              />
            </Modal>
          </Col>
        </Row>
        <Row align="center" className="registerRow">
          <Form.Item align="center" name="submit">
            <Button
              type="primary"
              align="center"
              htmlType="submit"
              disabled={createNewPostDisabled}
            >
              {createNewPostDisabled
                ? 'Upload 3 pictures before posting'
                : 'Post'}
            </Button>
          </Form.Item>
        </Row>
      </Form>
    </>
  );
}
export default CreateNewPost;
