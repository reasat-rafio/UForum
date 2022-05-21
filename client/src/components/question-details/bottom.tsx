import { useUI } from "@contexts/ui.context";
import { useUser } from "@contexts/user.conext";
import { yupResolver } from "@hookform/resolvers/yup";
import { CommentSchema } from "@libs/input-schema";
import axios from "axios";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Comment } from "./comment";

interface BottomProps {
  postID: string;
  comments: IComment[];
  setPost: Dispatch<SetStateAction<IPost>>;
}

interface IFormInput {
  comment: string;
}

export const Bottom: React.FC<BottomProps> = ({
  comments,
  postID,
  setPost,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IFormInput>({
    resolver: yupResolver(CommentSchema),
  });

  const { setPageLoading } = useUI();
  const { user } = useUser();

  async function onSubmit({ comment }: IFormInput) {
    // setPageLoading(true);
    try {
      const { data } = await axios.post(
        `http://localhost:8080/comment/create`,
        {
          comment,
          postID,
          userID: user?.id,
        }
      );
      setPost((prev) => ({ ...prev, comments: data.comment }));
      reset();
    } catch (err) {
      console.log("errr");
    } finally {
      //   setPageLoading(false);
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className="w-full py-5">
        <label className="block mb-2">
          <span className="text-gray-600">Your Answer</span>
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
      <div className="text-lg font-medium my-3">
        {comments?.length ? (
          <span>{comments?.length} Answers </span>
        ) : (
          <span>Answer</span>
        )}
      </div>
      <div className="flex flex-col divide-y divide-[#808080]/30">
        {comments
          ?.sort((a, b) => (a.createdAt > b.createdAt ? -1 : 1))
          .map((comment: IComment) => (
            <Comment key={comment.id} {...comment} />
          ))}
      </div>
    </div>
  );
};
