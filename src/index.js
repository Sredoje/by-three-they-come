import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import 'antd/dist/reset.css';
import reportWebVitals from './reportWebVitals';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Root from './pages/root';
import ErrorPage from './error-page';
import Index from './pages/index/index';
import Login from './pages/login/login';
import Register from './pages/register/register';
import CreateNewPost from './pages/myProfile/createNewPost/createNewPost';
import Reports from './pages/myProfile/reports/reports';
import AccountInfo from './pages/myProfile/accountInfo/accountInfo';
import Logout from './pages/logout/logout';
import MyPosts from './pages/myProfile/myPosts/myPosts';
import PurchasedItems from './pages/myProfile/purchasedItems/purchasedItems';
import ContactUs from './pages/contactUs/contactUs';

// After adding a route, be sure to update header.jsx
const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Index /> },
      { path: 'login', element: <Login></Login> },
      { path: 'register', element: <Register></Register> },
      { path: 'logout', element: <Logout></Logout> },
      {
        path: 'my-profile',
        // element: <MyProfile></MyProfile>,
        children: [
          {
            path: 'purchased-items',
            element: <PurchasedItems></PurchasedItems>,
          },
          {
            path: 'account-info',
            element: <AccountInfo></AccountInfo>,
          },
          {
            path: 'new-post',
            element: <CreateNewPost></CreateNewPost>,
          },
          {
            path: 'reports',
            element: <Reports></Reports>,
          },
          { path: 'my-posts', element: <MyPosts></MyPosts> },
        ],
      },
      { path: 'contact-us', element: <ContactUs></ContactUs> },
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
