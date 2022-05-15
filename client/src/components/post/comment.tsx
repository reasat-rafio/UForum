import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { CommentSchema } from "@libs/input-schema";
import { useUser } from "@contexts/user.conext";
import { useUI } from "@contexts/ui.context";
import axios from "axios";
import { DateTime } from "luxon";

interface CommentProps {
  comments: IComment[];
  postID: string;
  setState: Dispatch<SetStateAction<IPost[] | undefined>>;
  posts?: IPost[];
}

interface IFormInput {
  comment: string;
}

export const Comment: React.FC<CommentProps> = ({
  comments,
  postID,
  setState,
  posts,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IFormInput>({
    resolver: yupResolver(CommentSchema),
  });

  const { user } = useUser();
  const { setPageLoading } = useUI();

  async function onSubmit({ comment }: IFormInput) {
    setPageLoading(true);
    try {
      const { data } = await axios.post(
        `http://localhost:8080/comment/create`,
        {
          comment,
          postID,
          userID: user?.id,
        }
      );

      const crrStateIndex = posts?.map(({ id }) => id).indexOf(postID);
      const newPostsArr = posts;
      (newPostsArr as IPost[])[crrStateIndex as number] = data;
      setState(newPostsArr);
      reset();
    } catch (error: any) {
      console.log(error.response);
    } finally {
      setPageLoading(false);
    }
  }

  return (
    <motion.div
      initial={{ height: 0 }}
      animate={{ height: "auto" }}
      exit={{ height: 0 }}
    >
      <div className="bg-white rounded py-4 px-8 space-y-5 mt-2 flex flex-col divide-y">
        <form onSubmit={handleSubmit(onSubmit)} className="w-full">
          <label className="block mb-2">
            <span className="text-gray-600">Add a comment</span>
            <textarea
              {...register("comment")}
              className="block w-full mt-1 rounded"
              rows={3}
            ></textarea>
          </label>
          <button
            type="submit"
            className="px-3 py-2 text-sm text-blue-100 bg-blue-600 rounded"
          >
            Comment
          </button>
        </form>
        <div className="space-y-2 pt-5">
          {comments
            ?.sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1))
            .map(({ id, comment, user, createdAt }) => {
              const date = new Date(createdAt);
              const myDateTime = DateTime.fromMillis(Number(date)).toRelative();

              return (
                <div className="flex space-x-3" key={id}>
                  <div className="w-9 h-9 rounded-full overflow-hidden">
                    <img src={user.imageUrl} alt={`${user.username}'s image`} />
                  </div>
                  <div className="flex-1">
                    <div className="bg-slate-100 rounded p-2">
                      <span className="font-medium">{user.username}</span>
                      <p className="text-sm">{comment}</p>
                    </div>
                    <div className="text-xs space-x-2 mt-1">
                      <span>like</span>
                      <span>reply</span>
                      <span>{myDateTime}</span>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </motion.div>
  );
};
