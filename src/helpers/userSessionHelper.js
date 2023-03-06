const UserSessionHelper = {
  adminRole: 'admin',
  managerRole: 'manager',
  normalRole: 'normal',
  setUser: (user) => {
    localStorage.setItem('user', JSON.stringify(user));
  },
  getUser: () => {
    return JSON.parse(localStorage.getItem('user'));
  },
  getName: () => {
    return JSON.parse(localStorage.getItem('user'))?.userName;
  },
  getEmail: () => {
    return JSON.parse(localStorage.getItem('user'))?.email;
  },
  getId: () => {
    return JSON.parse(localStorage.getItem('user'))?.id;
  },
  getPoints: () => {
    return JSON.parse(localStorage.getItem('user'))?.points;
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
  isAdmin: () => {
    return (
      JSON.parse(localStorage.getItem('user'))?.role ===
      UserSessionHelper.adminRole
    );
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
