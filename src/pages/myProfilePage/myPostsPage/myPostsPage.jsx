import PostApi from '../../../api/postApi';
import { useState, useEffect } from 'react';
import { Card, Col, Row, Image } from 'antd';
let AWS = require('aws-sdk');

console.log(process.env);
AWS.config.update({
  accessKeyId: process.env.REACT_APP_AWS_S3_ACCESS_KEY,
  secretAccessKey: process.env.REACT_APP_AWS_S3_ACCESS_SECRET,
  region: 'eu-central-1',
});
const { Meta } = Card;

function getAWSUrl(key) {
  let s3 = new AWS.S3();
  const result = s3.getSignedUrlPromise('getObject', {
    Bucket: process.env.REACT_APP_AWS_S3_IMAGE_BUCKET,
    Key: key,
  });

  return result;
}

function MyPostsPage() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    console.log('USAO U USE EFFECT');
    // fetch data
    const dataFetch = async () => {
      const data = await PostApi.fetchUserPosts();
      console.log(data);
      // set state when the data received

      let newPosts = await data.posts.map((post, postIndex) => {
        post.PostItems.map((postItem, postItemIndex) => {
          getAWSUrl(postItem.key).then((res) => {
            postItem.publicUrl = res;
            if (postIndex == data.posts.length - 1 && postItemIndex == 2) {
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
      {posts.map((post) => {
        return (
          <Row align="center" className="registerRow" gutter={50} key={post.id}>
            {post.PostItems.map((postItem, index) => {
              return (
                <Col span={4} key={post.publicUrl}>
                  <Card bordered={false}>
                    {index < 2 ? (
                      <Image src={postItem.publicUrl} />
                    ) : (
                      <div>UNLOCK THIS ONE</div>
                    )}
                  </Card>
                </Col>
              );
            })}
          </Row>
        );
      })}
    </>
  );
}
export default MyPostsPage;
