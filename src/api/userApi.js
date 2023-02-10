const CREATE_USER_PATH = process.env.REACT_APP_API_URL + "users/signup";
const UserApi = {
  createUser: async function (username, password, email) {
    console.log(process.env.REACT_APP_API_URL);
    let response = await fetch(CREATE_USER_PATH, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        accept: "application/json",
      },
      body: JSON.stringify({
        userName: username,
        password: password,
        email: email,
      }),
    });

    if (!response.ok) {
      const message = `An error has occured: ${response.status}`;
      throw new Error(message);
    }

    const userData = await response.json();
    return userData;
  },
};
export default UserApi;
