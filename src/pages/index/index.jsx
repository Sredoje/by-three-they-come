import { Row, Col, Modal, Image, Card, message, Button, Spin } from 'antd';
import React, { useState, useEffect, useContext } from 'react';
import './index.css';
import PostApi from '../../api/postApi';
import AwsHelper from '../../helpers/awsHelper';
import { LockOutlined } from '@ant-design/icons';
import PostItemApi from '../../api/postItemApi';
import UserSessionHelper from '../../helpers/userSessionHelper';
import PointsContext from '../../context/pointsContext';
import InfiniteScroll from 'react-infinite-scroll-component';
import LoggedInContext from '../../context/loggedInContext';
import { useNavigate } from 'react-router-dom';
import Blur from 'react-blur';
// import Blur from 'react-blur';

function Index() {
  const [posts, setPosts] = useState([]);
  const [open, setOpen] = useState(false);
  const [openLoginModal, setOpenLoginModal] = useState(false);
  const { isLoggedIn } = useContext(LoggedInContext);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);
  const { setPoints } = useContext(PointsContext);
  const { error } = message;
  const navigate = useNavigate();
  const [modalText, setModalText] = useState(
    'Unlocking this image will cost you 200 points!'
  );
  const [hasMore, setHasMore] = useState(true);

  const showBuyModal = (postItemId) => {
    setOpen(true);
    setCurrentItem(postItemId);
  };

  const showLoginModal = () => {
    setOpenLoginModal(true);
  };

  const handleRegister = () => {
    setOpenLoginModal(false);
    navigate('/register');
  };

  const handleLogin = () => {
    setOpenLoginModal(false);
    navigate('/login');
  };

  const handleOk = async () => {
    setModalText('Processing unlock image');
    setConfirmLoading(true);
    try {
      let result = await PostItemApi.buyPostItem(currentItem);
      let newPosts = posts.map((post) => {
        if (post.id === result.userItem.postId) {
          post.PostItems.map((item) => {
            if (item.id === result.userItem.postItemId) {
              item.ownsItem = true;
              return item;
            }
            return item;
          });
        }
        return post;
      });
      setPoints(result.userItem.points);
      setOpen(false);
      setConfirmLoading(false);
      setPosts(newPosts);
    } catch (e) {
      setOpen(false);
      setConfirmLoading(false);
      error(e.message);
    }

    // Fetch new points from user
  };
  const handleCancel = () => {
    setOpen(false);
    setOpenLoginModal(false);
  };

  // eslint-disable-next-line
  const dataFetch = async () => {
    const offset = posts.length;

    const data = await PostApi.fetchIndexPosts(offset);
    if (data.posts.length === 0) {
      setHasMore(false);
    }
    // set state when the data received
    let userId = UserSessionHelper.getId();
    let newPosts = await data.posts.map((post, postIndex) => {
      post.PostItems.map((PostItem, postItemIndex) => {
        if (userId === PostItem.id) {
          PostItem.ownsItem = true;
        }
        AwsHelper.getAWSUrl(PostItem.key).then((res) => {
          PostItem.publicUrl = res;
          if (postIndex === data.posts.length - 1 && postItemIndex === 2) {
            setPosts(posts.concat(newPosts));
          }
        });
        return PostItem;
      });
      return post;
    });
  };

  useEffect(() => {
    if (posts.length === 0) {
      dataFetch();
    }
  }, [dataFetch, posts]);

  return (
    <>
      <Row className="itemWrapper" justify={'center'}>
        <Modal
          title="Are you sure you wanna unlock this image?"
          open={open}
          onOk={handleOk}
          confirmLoading={confirmLoading}
          onCancel={handleCancel}
        >
          <p>{modalText}</p>
        </Modal>

        <Modal
          title="Login or register to unlock photos"
          open={openLoginModal}
          onCancel={handleCancel}
          footer={[
            <Button key="cancel" onClick={handleCancel}>
              Cancel
            </Button>,
            <Button
              key="submit"
              type="primary"
              onClick={() => handleRegister()}
            >
              Register
            </Button>,
            <Button type="primary" onClick={() => handleLogin()}>
              Login
            </Button>,
          ]}
        >
          <p>You have to be logged in to unlock photos</p>
        </Modal>
        <InfiniteScroll
          dataLength={posts.length} //This is important field to render the next data
          next={dataFetch}
          hasMore={hasMore}
          loader={
            <Spin tip="Loading" size="large" className="indexLoader"></Spin>
          }
          endMessage={
            <p style={{ textAlign: 'center' }}>
              <b>Yay! You have seen it all</b>
            </p>
          }
        >
          {posts.map((post) => {
            return (
              <Row key={post.id} className="itemsRow">
                {post.PostItems.map((PostItem) => {
                  return (
                    <Col span={6} key={'col' + PostItem.id}>
                      <Card
                        style={{
                          margin: '0',
                        }}
                      >
                        {PostItem.status === 'locked' &&
                        PostItem.ownsItem === false ? (
                          <div className="unlockedWrapper">
                            <div
                              key={PostItem.id}
                              className="unlockedMask"
                              onClick={() =>
                                isLoggedIn
                                  ? showBuyModal(PostItem.id)
                                  : showLoginModal()
                              }
                            >
                              <div className="unlocked-mask">
                                <LockOutlined /> Unlock
                              </div>
                            </div>
                            {/* <img
                              className="ant-image-img locked"
                              src={PostItem.publicUrl}
                              key={PostItem.key}
                              width={300}
                              alt=""
                            ></img> */}
                            <Blur blurRadius={5} img={PostItem.publicUrl} />
                          </div>
                        ) : (
                          <Image key={PostItem.key} src={PostItem.publicUrl} />
                        )}
                      </Card>
                    </Col>
                  );
                })}
              </Row>
            );
          })}
        </InfiniteScroll>
      </Row>
    </>
  );
}
export default Index;
