const UserSessionHelper = {
  setUser: (user) => {
    localStorage.setItem("user", JSON.stringify(user));
  },
  getUser: () => {
    return JSON.parse(localStorage.getItem("user"));
  },
  getName: () => {
    return JSON.parse(localStorage.getItem("user")).userName;
  },
  getEmail: () => {
    return JSON.parse(localStorage.getItem("user")).email;
  },
  getId: () => {
    return JSON.parse(localStorage.getItem("user")).id;
  },
  setToken: (token) => {
    localStorage.setItem("token", token);
  },
};

export default UserSessionHelper;
