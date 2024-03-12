import { useQuery } from "@tanstack/react-query";

import useAxiosSecure from "../api/useAxiosSecure";
import useAuth from "./useAuth";
import { useParams } from "react-router-dom";

const useReaction = () => {


const {id} = useParams();

  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const { data: reactionData = {}, refetch } = useQuery({
    queryKey: ["reactions", id],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/reactions/${id}`);
      return data.data;
    },
  });

  const like = reactionData?.reactions?.likes || 0;
  const disLike = reactionData?.reactions?.dislikes || 0;

  const handleLike = async () => {
    await axiosSecure.post("/reactions", {
      userId: user?.uid,
      postId: id,
      isLike: true,
    });
    refetch();
  };

  const handleDisLike = async () => {
    await axiosSecure.post("/reactions", {
      userId: user?.uid,
      postId: id,
      isLike: false,
    });
    refetch();
  };

  return {
    like,
    disLike,
    handleLike,
    handleDisLike,
  };
};

export default useReaction;
