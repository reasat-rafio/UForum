import React from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { CommentSchema } from "@libs/input-schema";

interface CommentProps {
  comments: IComment[];
}

interface IFormInput {
  comment: string;
}

export const Comment: React.FC<CommentProps> = ({ comments }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IFormInput>({
    resolver: yupResolver(CommentSchema),
  });

  async function onSubmit({ comment }: IFormInput) {
    reset();
  }

  return (
    <motion.div
      initial={{ height: 0 }}
      animate={{ height: "auto" }}
      exit={{ height: 0 }}
    >
      <div className="bg-white rounded py-4  px-8 space-y-5 mt-2">
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
      </div>
    </motion.div>
  );
};
