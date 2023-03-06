const CREATE_USER_PATH = process.env.REACT_APP_API_URL + 'users/signup';
const LOGIN_USER_PATH = process.env.REACT_APP_API_URL + 'users/login';
const UserApi = {
  createUser: async function (username, password, email) {
    let response = await fetch(CREATE_USER_PATH, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        accept: 'application/json',
      },
      body: JSON.stringify({
        username: username,
        password: password,
        email: email,
      }),
    });

    if (!response.ok) {
      let responseBody = await response.json();
      // console.log(text);
      throw new Error(responseBody.message);
    }

    const userData = await response.json();
    return userData;
  },
  loginUser: async function (email, password) {
    let response = await fetch(LOGIN_USER_PATH, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        accept: 'application/json',
      },
      body: JSON.stringify({
        password: password,
        email: email,
      }),
    });

    if (!response.ok) {
      let responseBody = await response.json();
      // console.log(text);
      throw new Error(responseBody.message);
    }

    const userData = await response.json();
    return userData;
  },
};
export default UserApi;
