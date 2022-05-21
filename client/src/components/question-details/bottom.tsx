import { useUI } from "@contexts/ui.context";
import { yupResolver } from "@hookform/resolvers/yup";
import { CommentSchema } from "@libs/input-schema";
import React from "react";
import { useForm } from "react-hook-form";
import { Comment } from "./comment";

interface BottomProps {
  comments: IComment[];
}

interface IFormInput {
  comment: string;
}

export const Bottom: React.FC<BottomProps> = ({ comments }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IFormInput>({
    resolver: yupResolver(CommentSchema),
  });

  const { setPageLoading } = useUI();

  async function onSubmit({ comment }: IFormInput) {
    setPageLoading(true);
    try {
    } catch (err) {}
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
        {comments?.map((comment) => (
          <Comment key={comment.id} {...comment} />
        ))}
      </div>
    </div>
  );
};
