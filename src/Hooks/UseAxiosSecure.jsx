import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const UseAxiosSecure = () => {
  const navigate = useNavigate();
  const axiosSecure = axios.create({
    // baseURL: "http://localhost:5000/",
    baseURL: "https://pixventory.vercel.app/",
  });

  useEffect(() => {
    axiosSecure.interceptors.response.use(
      (response) => response,
      async (error) => {
        console.log(error);
       
        return Promise.reject(error);
      }
    );
  }, [ navigate, axiosSecure]);
  return [axiosSecure];
};

export default UseAxiosSecure;
