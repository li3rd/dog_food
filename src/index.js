import React from 'react';
import ReactDOM from 'react-dom/client';

import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import './index.css';
import App from './App';
import { Main } from './components/Main/Main';


import { SignInForm } from './components/SignInForm/SignInForm';
import { SignUpForm } from './components/SignUpForm/SignUpForm';

const myRouter = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <Main />
      },
      {
        path: 'signin',
        element: <SignInForm />
      },
      {
        path: 'signup',
        element: <SignUpForm />
      }
    ]
  },
])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={myRouter} />
  </React.StrictMode>
);
