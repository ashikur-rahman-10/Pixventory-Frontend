import React from "react";
import UseAxiosSecure from "./UseAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import CustomLoader from "../Components/CustomLoader/CustomLoader";

const UsePhotosByEmail = (e) => {
  const [axiosSecure] = UseAxiosSecure();


  const { data: userPosts = [], refetch: userPostsRefetch } = useQuery({
    queryKey: ["userPosts"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/images/email/${e}`);
      console.log(res.data)
      return res.data;
    },
  });
  return { userPosts, userPostsRefetch };


};

export default UsePhotosByEmail;
