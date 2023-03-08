import PostApi from '../../../api/postApi';
import { useState, useEffect } from 'react';
import { Typography, Card, Image, Row, Col } from 'antd';
import AwsHelper from '../../../helpers/awsHelper';

function PurchasedItems() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    // fetch data
    const dataFetch = async () => {
      const data = await PostApi.fetchPurchasedPosts();
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
      <Typography.Title
        level={2}
        style={{
          margin: '25px 0 50px 0',
        }}
        align="center"
      >
        All your purchased posts
      </Typography.Title>
      <>
        <Row className="itemWrapper" justify={'center'}>
          {posts.map((post) => {
            return (
              <Row key={post.id} className="itemsRow">
                {post.PostItems.map((PostItem) => {
                  return (
                    <Col span={6} key={'col' + PostItem.id}>
                      <Card>
                        {PostItem.status === 'locked' &&
                        PostItem.ownsItem === false ? (
                          <div>
                            <div className="ant-image css-dev-only-do-not-override-ixblex">
                              <Image
                                preview={false}
                                key={PostItem.key}
                                src={PostItem.publicUrl}
                                className={'locked'}
                              ></Image>
                              <div key={PostItem.id} className="ant-image-mask">
                                <div className="ant-image-mask-info">
                                  Unlock
                                </div>
                              </div>
                            </div>
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
        </Row>
      </>
    </>
  );
}
export default PurchasedItems;
