import { Row, Col, Modal, Image, Card } from 'antd';
import React, { useState, useEffect } from 'react';
import './indexPage.css';
import PostApi from '../../api/postApi';
import AwsHelper from '../../helpers/awsHelper';
import { LockOutlined } from '@ant-design/icons';
// import Blur from 'react-blur';

function IndexPage() {
  const [posts, setPosts] = useState([]);
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState(
    'Unlocking this image will cost you 200 points!'
  );

  const showBuyModal = () => {
    setOpen(true);
  };

  const handleOk = () => {
    setModalText('Processing unlock image');
    setConfirmLoading(true);
    setTimeout(() => {
      // REDIRECT TO BOUGHT IMAGES
      setOpen(false);
      setConfirmLoading(false);
    }, 2000);
  };
  const handleCancel = () => {
    console.log('Clicked cancel button');
    setOpen(false);
  };

  useEffect(() => {
    // fetch data
    const dataFetch = async () => {
      const data = await PostApi.fetchIndexPosts();
      // set state when the data received

      let newPosts = await data.posts.map((post, postIndex) => {
        post.PostItems.map((postItem, postItemIndex) => {
          AwsHelper.getAWSUrl(postItem.key).then((res) => {
            postItem.publicUrl = res;
            if (postIndex === data.posts.length - 1 && postItemIndex === 2) {
              setPosts(newPosts);
            }
          });
          return postItem;
        });
        return post;
      });
    };

    dataFetch();
  }, []);
  return (
    <>
      <Row className="itemWrapper" gutter={[0, 50]}>
        {posts.map((post) => {
          return (
            <>
              {post.PostItems.map((postItem) => {
                return (
                  <Col span={8} key={postItem.id}>
                    <Card
                      style={
                        {
                          // width: 300,
                        }
                      }
                    >
                      {postItem.status === 'locked' ? (
                        <div>
                          <div class="ant-image css-dev-only-do-not-override-ixblex">
                            <Image
                              preview={false}
                              key={postItem.id}
                              src={postItem.publicUrl}
                              className={'locked'}
                            ></Image>
                            <div class="ant-image-mask" onClick={showBuyModal}>
                              <div class="ant-image-mask-info">
                                <LockOutlined />
                                Unlock
                              </div>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <Image
                          key={postItem.id}
                          // width={500}
                          src={postItem.publicUrl}
                        />
                      )}
                    </Card>
                  </Col>
                );
              })}
            </>
          );
        })}
      </Row>
      <Modal
        title="Are you sure you wanna unlock this image?"
        open={open}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        <p>{modalText}</p>
      </Modal>
    </>
  );
}
export default IndexPage;
