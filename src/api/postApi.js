import UserSessionHelper from '../helpers/userSessionHelper';

const CREATE_POST_API_URL =
  process.env.REACT_APP_API_URL + 'posts/create-new-post';
const FETCH_ALL_POSTS_API_URL =
  process.env.REACT_APP_API_URL + 'posts/all-posts';
const FETCH_USER_POSTS_API_URL =
  process.env.REACT_APP_API_URL + 'posts/user-posts';

const PostApi = {
  createPost: async function (data) {
    console.log(localStorage.token);
    let response = await fetch(CREATE_POST_API_URL, {
      method: 'POST',
      body: data,
      headers: {
        Accept: 'application/json',
        Authorization: 'Bearer ' + UserSessionHelper.getToken(),
      },
    });

    if (!response.ok) {
      let responseBody = await response.json();
      // console.log(text);
      throw new Error(responseBody.message);
    }

    const result = await response.json();
    return result;
  },
  fetchAllPosts: async function (data) {
    console.log(localStorage.token);
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
      // console.log(text);
      throw new Error(responseBody.message);
    }

    const result = await response.json();
    return result;
  },
  fetchUserPosts: async (userId) => {
    console.log(localStorage.token);
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
      // console.log(text);
      throw new Error(responseBody.message);
    }

    const result = await response.json();
    return result;
  },
};
export default PostApi;
