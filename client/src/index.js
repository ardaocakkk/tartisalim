import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {
  createBrowserRouter,
  RouterProvider
} from "react-router-dom"
import ErrorPage from './error-page';
import Register from './Routes/Register';
import { ChakraBaseProvider } from '@chakra-ui/react';
import Login from './Routes/Login';
import Welcome from './Routes/Welcome';
import Post from './Routes/Post';
import CurrentUserProfile from './Routes/UserProfile';
import Profile from './Routes/Profile';
import theme from './theme'
import { ColorModeScript } from '@chakra-ui/react';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />
  },
  {
    path: "/register",
    element: <Register />,
    errorElement: <ErrorPage />
  },
  {
    path: "/login",
    element: <Login />,
    errorElement: <ErrorPage />
  },
  {
    path: "/welcome",
    element: <Welcome />,
    errorElement: <ErrorPage />
  },
  {
    path: "/profile/me",
    element: <CurrentUserProfile />,
    errorElement: <ErrorPage />
  },
  {
    path: "/profile/:userName",
    element: <Profile />,
    errorElement: <ErrorPage />
  },
  {
    path: "/posts/:id",
    element: <Post />,
  },



])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ChakraBaseProvider>
  <ColorModeScript initialColorMode={theme.config.initialColorMode} />
    <RouterProvider router={router} />
  </ChakraBaseProvider>
);


