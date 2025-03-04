import React from "react";
import UseAxiosSecure from "./UseAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import CustomLoader from "../Components/CustomLoader/CustomLoader";

const UsePhotosByEmail = (email) => {
  const [axiosSecure] = UseAxiosSecure();

  // Fetch user posts using React Query
  const { data: userPosts = [], refetch: userPostsRefetch, isLoading, isError, error } = useQuery({
    queryKey: ["userPosts", email], // Ensure re-fetching when email changes
    queryFn: async () => {
      const res = await axiosSecure.get(`/images/email/${email}`);
      return res.data;
    },
    enabled: !!email, // Only fetch when email exists
  });

  // Show loading spinner while fetching data
  if (isLoading) {
    return { userPosts: [], userPostsRefetch, isLoading: true };
  }

  // Handle errors gracefully
  if (isError) {
    console.error("Error fetching images:", error);
    return { userPosts: [], userPostsRefetch, error };
  }

  return { userPosts, userPostsRefetch, isLoading: false };
};

export default UsePhotosByEmail;
