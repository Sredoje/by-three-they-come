import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import 'antd/dist/reset.css';
import reportWebVitals from './reportWebVitals';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Root from './pages/root';
import ErrorPage from './error-page';
import IndexPage from './pages/indexPage/indexPage';
import LoginPage from './pages/loginPage/loginPage';
import RegisterPage from './pages/registerPage/registerPage';
import CreateNewPostPage from './pages/myProfilePage/createNewPostPage/createNewPostPage';
import ReportsPage from './pages/myProfilePage/reportsPage/reportsPage';
import AccountInfoPage from './pages/myProfilePage/accountInfoPage/accountInfoPage';
import LogoutPage from './pages/logoutPage/logoutPage';
import MyPostsPage from './pages/myProfilePage/myPostsPage/myPostsPage';

// After adding a route, be sure to update header.jsx
const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <IndexPage /> },
      { path: 'login', element: <LoginPage></LoginPage> },
      { path: 'register', element: <RegisterPage></RegisterPage> },
      { path: 'logout', element: <LogoutPage></LogoutPage> },
      {
        path: 'my-profile',
        // element: <MyProfilePage></MyProfilePage>,
        children: [
          {
            path: 'account-info',
            element: <AccountInfoPage></AccountInfoPage>,
          },
          {
            path: 'new-post',
            element: <CreateNewPostPage></CreateNewPostPage>,
          },
          {
            path: 'reports',
            element: <ReportsPage></ReportsPage>,
          },
          { path: 'my-posts', element: <MyPostsPage></MyPostsPage> },
        ],
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
