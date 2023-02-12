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
  isLoggedIn: () => {
    let token = localStorage.getItem("token");
    console.log(token);
    if (token == null) {
      return false;
    } else {
      return true;
    }
  },
};

export default UserSessionHelper;
