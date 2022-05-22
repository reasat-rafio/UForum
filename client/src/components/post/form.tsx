import Button from "@components/ui/button";
import { yupResolver } from "@hookform/resolvers/yup";
import { PostSchema } from "@libs/input-schema";
import clsx from "clsx";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import ReactTagInput from "@pathofdev/react-tag-input";
import "@pathofdev/react-tag-input/build/index.css";
import { useUI } from "@contexts/ui.context";
import axios from "axios";
import { useUser } from "@contexts/user.conext";
import { useRouter } from "next/router";
import { v4 as uuid } from "uuid";

export interface IFormInput {
  title: string;
  description: string;
}

interface FormProps {
  className?: string;
  data?: IPost;
  actonType?: "post" | "edit";
}

export const Form: React.FC<FormProps> = ({
  className,
  data,
  actonType = "post",
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IFormInput>({
    mode: "onChange",
    defaultValues: {
      description: data?.description && data.description,
      title: data?.title && data.title,
    },
    resolver: yupResolver(PostSchema),
  });

  const router = useRouter();

  const { setPageLoading } = useUI();
  const { user, setUserAction } = useUser();
  const [tags, setTags] = React.useState<string[]>([]);

  useEffect(() => {
    if (data?.tags) {
      setTags(data.tags);
    }
  }, [data]);

  async function onSubmit({ title, description }: IFormInput) {
    setPageLoading(true);
    try {
      if (actonType === "post") {
        const { data } = await axios.post("http://localhost:8080/post/submit", {
          title,
          description,
          tags,
          userId: user?.id,
        });

        setUserAction(data.user);
        router.push(`/profile/question/${user?.id}`);
        reset();
      }

      if (actonType === "edit") {
        const res = await axios.post(
          `http://localhost:8080/post/edit/${data?.id}`,
          {
            title,
            description,
            tags,
          }
        );

        router.push(`/profile/question/${user?.id}`);
      }
    } catch (error: any) {
      console.log(error.response);
    } finally {
      setPageLoading(false);
    }
  }

  return (
    <div className={clsx(className)}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-7 flex flex-col rounded space-y-5"
      >
        <ReactTagInput
          placeholder="Type tags and press enter"
          tags={tags}
          onChange={(newTags) => setTags(newTags)}
        />

        <input
          className={clsx(
            "rounded border-gray-300 p-4  outline-none",
            errors.title?.message && "ring ring-red-600 focus:ring-red-600"
          )}
          placeholder="Type catching attention title"
          type="text"
          {...register("title")}
        />
        <textarea
          className={clsx(
            "rounded border-gray-300 p-4  outline-none",
            errors.title?.message && "ring ring-red-600 focus:ring-red-600"
          )}
          placeholder="Type your question"
          cols={30}
          rows={20}
          {...register("description")}
        ></textarea>
        <div className="flex justify-end">
          <Button
            icon={{
              position: "left",
              component: <img src="/icons/send.svg" alt="register icon" />,
            }}
            variant="secondary"
          >
            Publish
          </Button>
        </div>
      </form>
    </div>
  );
};
