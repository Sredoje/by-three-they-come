import UserSessionHelper from '../helpers/userSessionHelper';

const POSTS_API_URL = process.env.REACT_APP_API_URL + 'posts/';
const FETCH_ALL_POSTS_API_URL =
  process.env.REACT_APP_API_URL + 'posts/all-posts';
const FETCH_USER_POSTS_API_URL =
  process.env.REACT_APP_API_URL + 'posts/user-posts';
const LOCK_POST_ITEM_API_URL = POSTS_API_URL + 'lock-post-item';
const UNLOCK_POST_ITEM_API_URL = POSTS_API_URL + 'unlock-post-item';
const PUBLISH_POSTS_API_URL = POSTS_API_URL + 'publish';

const PostApi = {
  createPost: async function (data) {
    let response = await fetch(POSTS_API_URL, {
      method: 'POST',
      body: data,
      headers: {
        Accept: 'application/json',
        Authorization: 'Bearer ' + UserSessionHelper.getToken(),
      },
    });

    if (!response.ok) {
      let responseBody = await response.json();
      throw new Error(responseBody.message);
    }

    const result = await response.json();
    return result;
  },
  fetchAllPosts: async function (data) {
    let response = await fetch(FETCH_ALL_POSTS_API_URL, {
      method: 'POST',
      body: {
        userId: UserSessionHelper.getId(),
      },
      headers: {
        Accept: 'application/json',
        Authorization: 'Bearer ' + UserSessionHelper.getToken(),
      },
    });

    if (!response.ok) {
      let responseBody = await response.json();
      throw new Error(responseBody.message);
    }

    const result = await response.json();
    return result;
  },
  fetchUserPosts: async () => {
    let response = await fetch(
      FETCH_USER_POSTS_API_URL + '/' + UserSessionHelper.getId(),
      {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          Authorization: 'Bearer ' + UserSessionHelper.getToken(),
        },
      }
    );

    if (!response.ok) {
      let responseBody = await response.json();
      throw new Error(responseBody.message);
    }

    const result = await response.json();
    return result;
  },
  deletePost: async (postId) => {
    let response = await fetch(POSTS_API_URL + postId, {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        Authorization: 'Bearer ' + UserSessionHelper.getToken(),
      },
    });

    if (!response.ok) {
      let responseBody = await response.json();
      throw new Error(responseBody.message);
    }

    const result = await response.json();
    return result;
  },
  lockPostItem: async (itemId) => {
    console.log(itemId);
    let response = await fetch(LOCK_POST_ITEM_API_URL, {
      method: 'POST',
      body: JSON.stringify({ postItemId: itemId }),
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: 'Bearer ' + UserSessionHelper.getToken(),
      },
    });

    if (!response.ok) {
      let responseBody = await response.json();
      throw new Error(responseBody.message);
    }

    const result = await response.json();
    return result;
  },
  unlockPostItem: async (itemId) => {
    let response = await fetch(UNLOCK_POST_ITEM_API_URL, {
      method: 'POST',
      body: JSON.stringify({ postItemId: itemId }),
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: 'Bearer ' + UserSessionHelper.getToken(),
      },
    });

    if (!response.ok) {
      let responseBody = await response.json();
      throw new Error(responseBody.message);
    }

    const result = await response.json();
    return result;
  },
  publishPost: async (postId) => {
    let response = await fetch(PUBLISH_POSTS_API_URL, {
      method: 'POST',
      body: JSON.stringify({ postId: postId }),
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: 'Bearer ' + UserSessionHelper.getToken(),
      },
    });

    if (!response.ok) {
      let responseBody = await response.json();
      throw new Error(responseBody.message);
    }

    const result = await response.json();
    return result;
  },
};
export default PostApi;
