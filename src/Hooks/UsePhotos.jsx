import React from "react";
import UseAxiosSecure from "./UseAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const UsePhotos = () => {
  const [axiosSecure] = UseAxiosSecure();
  const { data: images = [], refetch: imagesRefetch } = useQuery({
    queryKey: ["images"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/images`);
      return res.data;
    },
  });
  return { images, imagesRefetch };
};

export default UsePhotos;
