import { Row, Col, Modal, Image, Card } from 'antd';
import React, { useState, useEffect } from 'react';
import './indexPage.css';
import PostApi from '../../api/postApi';
import AwsHelper from '../../helpers/awsHelper';
import { LockOutlined } from '@ant-design/icons';
import PostItemApi from '../../api/postItemApi';
// import Blur from 'react-blur';

function IndexPage() {
  const [posts, setPosts] = useState([]);
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);
  const [modalText, setModalText] = useState(
    'Unlocking this image will cost you 200 points!'
  );

  const showBuyModal = (postItemId) => {
    setOpen(true);
    setCurrentItem(postItemId);
  };

  const handleOk = async () => {
    setModalText('Processing unlock image');
    setConfirmLoading(true);
    let result = await PostItemApi.buyPostItem(currentItem);
    console.log('ovo je posts posle', posts);
    //UserSessionHelper.setPoints(result.userItem.points);
    // SET CONTEXT
    let newPosts = posts.map((post) => {
      if (post.id === result.userItem.postId) {
        post.postItems.map((item) => {
          if (item.id === result.userItem.postItemId) {
            item.ownsItem = true;
            return item;
          }
          return item;
        });
      }
      return post;
    });

    setOpen(false);
    setConfirmLoading(false);
    console.log('ovo je posts posle', newPosts);
    setPosts(newPosts);
    // Fetch new points from user
  };
  const handleCancel = () => {
    console.log('Clicked cancel button');
    setOpen(false);
  };

  useEffect(() => {
    // fetch data
    const dataFetch = async () => {
      const data = await PostApi.fetchIndexPosts();
      console.log(data);
      // set state when the data received
      let newPosts = await data.posts.map((post, postIndex) => {
        post.postItems.map((postItem, postItemIndex) => {
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
        DODAJ HVATANJE POENA KAD GOD SE UCITA STRANA
        {posts.map((post) => {
          return (
            <Row key={post.id}>
              {post.postItems.map((postItem) => {
                return (
                  <Col span={8} key={'col' + postItem.id}>
                    <Card
                      style={
                        {
                          // width: 300,
                        }
                      }
                    >
                      {postItem.status === 'locked' &&
                      postItem.ownsItem === false ? (
                        <div>
                          <div className="ant-image css-dev-only-do-not-override-ixblex">
                            <Image
                              preview={false}
                              key={postItem.key}
                              src={postItem.publicUrl}
                              className={'locked'}
                            ></Image>
                            <div
                              key={postItem.id}
                              className="ant-image-mask"
                              onClick={() => showBuyModal(postItem.id)}
                            >
                              <div className="ant-image-mask-info">
                                <LockOutlined />
                                Unlock
                              </div>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <Image
                          key={postItem.key}
                          // width={500}
                          src={postItem.publicUrl}
                        />
                      )}
                    </Card>
                  </Col>
                );
              })}
            </Row>
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
