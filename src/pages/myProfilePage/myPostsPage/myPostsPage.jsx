import PostApi from '../../../api/postApi';
import { useState, useEffect, Suspense } from 'react';
import ItemHolder from './itemHolder';
import { Button, Typography, Space, Table, Tag, message } from 'antd';
let AWS = require('aws-sdk');

AWS.config.update({
  accessKeyId: process.env.REACT_APP_AWS_S3_ACCESS_KEY,
  secretAccessKey: process.env.REACT_APP_AWS_S3_ACCESS_SECRET,
  region: 'eu-central-1',
});

function getAWSUrl(key) {
  let s3 = new AWS.S3();
  const result = s3.getSignedUrlPromise('getObject', {
    Bucket: process.env.REACT_APP_AWS_S3_IMAGE_BUCKET,
    Key: key,
  });

  return result;
}
function Loading() {
  return <h2>🌀 Loading...</h2>;
}

function MyPostsPage() {
  const [posts, setPosts] = useState([]);
  const [messageApi, contextHolder] = message.useMessage();

  function hasLockedItem(postItems) {
    return postItems.some((postItem) => postItem.status === 'locked');
  }

  async function handlePublishPost(post) {
    let response = await PostApi.publishPost(post.id);

    let newPosts = posts.map((unchangedPost) => {
      if (unchangedPost.id === response.post.id) {
        return response.post;
      }
      return unchangedPost;
    });

    messageApi.open({
      type: 'success',
      content: 'Sucesffully published post!',
    });
    setPosts(newPosts);
  }

  function isAvaliableForPublishing(post) {
    return post.status === 'draft' && hasLockedItem(post.PostItems);
  }

  async function handleDeletePost(postForDelete) {
    await PostApi.deletePost(postForDelete.id);
    let newPosts = posts.filter((post) => {
      return post.id !== postForDelete.id;
    });
    messageApi.open({
      type: 'success',
      content: 'Sucesffully deleted post!',
    });
    setPosts(newPosts);
  }

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'name',
      render: (_, { status }) => (
        <>
          {status === 'draft' ? (
            <Tag color="processing">draft</Tag>
          ) : (
            <Tag color="success">published</Tag>
          )}
        </>
      ),
    },
    {
      title: 'Images',
      dataIndex: 'PostItems',
      render: (_, { PostItems, status }) => (
        <>
          <Space align={'center'} size={20}>
            {PostItems.map((item) => {
              return (
                <ItemHolder
                  key={item.id}
                  item={item}
                  status={status}
                  setPosts={setPosts}
                  posts={posts}
                  hasLockedItem={hasLockedItem(PostItems)}
                  getAWSUrl={getAWSUrl}
                ></ItemHolder>
              );
            })}
          </Space>
        </>
      ),
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, post) => (
        <Space>
          {post.status === 'draft' ? (
            <Button
              type="primary"
              onClick={() => handlePublishPost(post)}
              disabled={!isAvaliableForPublishing(post)}
            >
              Publish post
            </Button>
          ) : (
            ''
          )}

          <Button
            danger
            onClick={() => {
              handleDeletePost(post);
            }}
          >
            Delete post
          </Button>
        </Space>
      ),
    },
  ];

  useEffect(() => {
    // fetch data
    const dataFetch = async () => {
      const data = await PostApi.fetchUserPosts();
      // set state when the data received

      let newPosts = await data.posts.map((post, postIndex) => {
        post.PostItems.map((postItem, postItemIndex) => {
          getAWSUrl(postItem.key).then((res) => {
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
      <Suspense fallback={<Loading />}>
        {contextHolder}
        <Typography.Title
          level={2}
          style={{
            margin: '25px 0 50px 0',
          }}
          align="center"
        >
          List of your all posts, here you can publish your posts and you can
          remove posts that you don't like - Add locking of the postImage ( any
          can be locked as far as its in draft) ( check user) - Add removing of
          the post - Add publishing of the post
        </Typography.Title>
        <Table
          columns={columns}
          dataSource={posts}
          rowKey={(record) => record.id}
        />
      </Suspense>
    </>
  );
}
export default MyPostsPage;
