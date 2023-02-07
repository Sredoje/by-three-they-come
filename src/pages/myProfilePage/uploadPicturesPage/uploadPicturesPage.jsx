import { PlusOutlined } from "@ant-design/icons";
import { Modal, Upload, Row, Col, Button, Form } from "antd";
import { useState } from "react";

// Express side of upload https://github.com/react-component/upload/blob/master/server.js

function UploadPicturesPage() {
  const getBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const [fileList, setFileList] = useState([
    // {
    //   uid: "-5",
    //   name: "image.png",
    //   status: "error",
    // },
  ]);

  const [lockedFileList, setLockedFileList] = useState([]);

  let createNewPostDisabled =
    lockedFileList.length + fileList.length < 3 ? true : false;
  const handleCancel = () => setPreviewOpen(false);
  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
    setPreviewTitle(
      file.name || file.url.substring(file.url.lastIndexOf("/") + 1)
    );
  };

  const handleFinish = (values) => {
    console.log(values);
  };
  const handleChange = ({ fileList: newFileList }) => setFileList(newFileList);
  const handleLockedChange = ({ fileList: newFileList }) =>
    setLockedFileList(newFileList);

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
      onSuccess("ok");
    }, 0);
  };
  const uploadLockedButton = (
    <div>
      <PlusOutlined />
      <div
        style={{
          marginTop: 8,
        }}
      >
        Upload Locked One
      </div>
    </div>
  );

  const normFile = (e) => {
    console.log("Upload event:", e);
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };
  return (
    <>
      <div>This is Upload picture page asdasdasdas, ADD FORM ELEMENT</div>
      <Form
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 14 }}
        layout="horizontal"
        onFinish={handleFinish}
        style={{ maxWidth: 600 }}
      >
        <Row align="center" className="registerRow">
          <Col align="center">
            <Form.Item
              label="Switch"
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
              >
                {fileList.length >= 2 ? null : uploadButton}
              </Upload>
            </Form.Item>
            <Form.Item
              label="Switch"
              valuePropName="lockedFileList"
              getValueFromEvent={normFile}
              name="uploadLocked"
            >
              <Upload
                customRequest={dummyRequest}
                listType="picture-card"
                fileList={lockedFileList}
                valuePropName="lockedFileList"
                onPreview={handlePreview}
                onChange={handleLockedChange}
              >
                {lockedFileList.length === 1 ? null : uploadLockedButton}
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
                  width: "100%",
                }}
                src={previewImage}
              />
            </Modal>
          </Col>
        </Row>
        <Form.Item>
          <Button
            type="primary"
            align="center"
            htmlType="submit"
            disabled={createNewPostDisabled}
          >
            {createNewPostDisabled
              ? "Upload 3 pictures before posting"
              : "Post"}
          </Button>
        </Form.Item>
      </Form>
    </>
  );
}
export default UploadPicturesPage;
