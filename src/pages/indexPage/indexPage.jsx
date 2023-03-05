import { Row, Col, Modal, Image, Card } from 'antd';
import React, { useState, useEffect, useContext } from 'react';
import './indexPage.css';
import PostApi from '../../api/postApi';
import AwsHelper from '../../helpers/awsHelper';
import { LockOutlined } from '@ant-design/icons';
import PostItemApi from '../../api/postItemApi';
import UserSessionHelper from '../../helpers/userSessionHelper';
import PointsContext from '../../context/pointsContext';
import InfiniteScroll from 'react-infinite-scroll-component';
// import Blur from 'react-blur';

function IndexPage() {
  const [posts, setPosts] = useState([]);
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);
  const { setPoints } = useContext(PointsContext);
  const [modalText, setModalText] = useState(
    'Unlocking this image will cost you 200 points!'
  );
  const [hasMore, setHasMore] = useState(true);

  const showBuyModal = (postItemId) => {
    setOpen(true);
    setCurrentItem(postItemId);
  };

  const handleOk = async () => {
    setModalText('Processing unlock image');
    setConfirmLoading(true);
    let result = await PostItemApi.buyPostItem(currentItem);
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
    setPoints(result.userItem.points);
    setOpen(false);
    setConfirmLoading(false);
    setPosts(newPosts);
    // Fetch new points from user
  };
  const handleCancel = () => {
    console.log('Clicked cancel button');
    setOpen(false);
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
      post.postItems.map((postItem, postItemIndex) => {
        if (userId === postItem.id) {
          postItem.ownsItem = true;
        }
        AwsHelper.getAWSUrl(postItem.key).then((res) => {
          postItem.publicUrl = res;
          if (postIndex === data.posts.length - 1 && postItemIndex === 2) {
            setPosts(posts.concat(newPosts));
          }
        });
        return postItem;
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
        <InfiniteScroll
          dataLength={posts.length} //This is important field to render the next data
          next={dataFetch}
          hasMore={hasMore}
          loader={<h4>Loading...</h4>}
          endMessage={
            <p style={{ textAlign: 'center' }}>
              <b>Yay! You have seen it all</b>
            </p>
          }
        >
          DODAJ FORGOT PASSWORD DODAJ CONFIRM ACCOUNT DODAJ RESET PASWORD
          SKLOINI UPLOAD SLIKA ZA DRUGE DODAJ ROLE
          {posts.map((post) => {
            return (
              <>
                <Row key={post.id} className="itemsRow">
                  {post.postItems.map((postItem) => {
                    return (
                      <Col span={8} key={'col' + postItem.id}>
                        <Card
                          style={{
                            width: 350,
                          }}
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
                              src={postItem.publicUrl}
                            />
                          )}
                        </Card>
                      </Col>
                    );
                  })}
                </Row>
              </>
            );
          })}
        </InfiniteScroll>
      </Row>
    </>
  );
}
export default IndexPage;
