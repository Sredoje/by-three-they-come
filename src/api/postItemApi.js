import UserSessionHelper from '../helpers/userSessionHelper';

const POST_ITEM_API_URL = process.env.REACT_APP_API_URL + 'postItems/';
const LOCK_API_URL = POST_ITEM_API_URL + 'lock';
const UNLOCK_API_URL = POST_ITEM_API_URL + 'unlock';
const BUY_API_URL = POST_ITEM_API_URL + 'buy';

const PostItemApi = {
  lockPostItem: async (itemId) => {
    console.log(itemId);
    let response = await fetch(LOCK_API_URL, {
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
    let response = await fetch(UNLOCK_API_URL, {
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
  buyPostItem: async (postItemId) => {
    let response = await fetch(BUY_API_URL, {
      method: 'POST',
      body: JSON.stringify({ postItemId: postItemId }),
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
export default PostItemApi;
