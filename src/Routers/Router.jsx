import React from "react";
import { createBrowserRouter } from "react-router-dom";
import Home from "../Pages/Home/Home";
import Main from "../Layouts/Main";
import AddImg from "../Pages/AddImg/AddImg";
import Photos from "../Pages/Photos/Photos";
import Login from "../Pages/Login&Register/Login";
import Register from "../Pages/Login&Register/Register";

const Router = createBrowserRouter([
  {
    path:'/',
    element:<Main/>,
    children:[
      {
        path:'/',
        element:<AddImg/>
      },
      {
        path:'/add-imgs',
        element:<AddImg/>
      },
      {
        path:'/images',
        element:<Photos/>
      },
      {
        path:'/login',
        element:<Login/>
      },
      {
        path:'/register',
        element:<Register/>
      }
    ]
  }
])

export default Router;
