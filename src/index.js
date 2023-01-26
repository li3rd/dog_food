import React from 'react';
import ReactDOM from 'react-dom/client';

import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import './index.css';
import App from './App';
import { Main } from './components/Main/Main';


import { SignInForm } from './components/SignInForm/SignInForm';
import { SignUpForm } from './components/SignUpForm/SignUpForm';
import { Products } from './components/Products/Products';
import { AppContextProvider } from './components/context/AppContextProvider';


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
      },
      {
        path: 'products',
        element: <Products />
      }
    ]
  },
])


const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <AppContextProvider>
        <RouterProvider router={myRouter} />
      </AppContextProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
