import { useEffect, useState } from 'react';
import { Card, Image, Button, message } from 'antd';
import PostApi from '../../../api/postApi';

function ItemHolder({
  item: propItem,
  status,
  setPosts,
  posts,
  hasLockedItem,
  getAWSUrl,
}) {
  const [item, setItem] = useState(propItem);
  const { success } = message;

  useEffect(() => {
    async function fetchUrls() {
      if (!propItem.publicUrl) {
        propItem.publicUrl = await getAWSUrl(propItem.key);
      }
      setItem(propItem);
    }

    fetchUrls();
  }, [propItem, getAWSUrl]);

  const updatePostItemStatus = (postId, postItemId, newStatus) => {
    return posts.map((post) => {
      if (post.id === postId) {
        const newPostItems = post.PostItems.map((postItem) => {
          if (postItem.id === postItemId) {
            return { ...postItem, status: newStatus };
          }
          return postItem;
        });
        return { ...post, PostItems: newPostItems };
      }
      return post;
    });
  };

  const handleLockUnlockItem = async (postItem, status) => {
    const apiFunction =
      status === 'locked' ? PostApi.unlockPostItem : PostApi.lockPostItem;
    await apiFunction(postItem.id);

    const newStatus = status === 'locked' ? 'unlocked' : 'locked';
    const newPosts = updatePostItemStatus(
      postItem.postId,
      postItem.id,
      newStatus
    );
    setPosts(newPosts);

    success('Successfully updated image status');
  };

  return (
    <Card
      key={item.id}
      actions={[
        status === 'draft' && (
          <Button
            onClick={() => handleLockUnlockItem(item, item.status)}
            disabled={hasLockedItem && item.status === 'unlocked'}
          >
            {item.status === 'unlocked'
              ? 'Hide image under paywall'
              : 'Remove paywall from image'}
          </Button>
        ),
      ]}
      style={{ width: 200 }}
    >
      <Image key={item.publicUrl} src={item.publicUrl} />
    </Card>
  );
}

export default ItemHolder;
