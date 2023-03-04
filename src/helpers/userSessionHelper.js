const UserSessionHelper = {
  setUser: (user) => {
    localStorage.setItem('user', JSON.stringify(user));
  },
  getUser: () => {
    return JSON.parse(localStorage.getItem('user'));
  },
  getName: () => {
    return JSON.parse(localStorage.getItem('user')).userName;
  },
  getEmail: () => {
    return JSON.parse(localStorage.getItem('user')).email;
  },
  getId: () => {
    return JSON.parse(localStorage.getItem('user')).id;
  },
  setPoints: (newPoints) => {
    let user = JSON.parse(localStorage.getItem('user'));
    user.points = newPoints;
    UserSessionHelper.setUser(user);
  },
  setToken: (token) => {
    localStorage.setItem('token', token);
  },
  isLoggedIn: () => {
    let token = localStorage.getItem('token');

    if (token == null) {
      return false;
    } else {
      return true;
    }
  },
  clearStorage: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },
  getToken: () => {
    let token = localStorage.getItem('token');
    return token;
  },
};

export default UserSessionHelper;
