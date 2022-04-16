import Button from "@components/ui/button";
import Input from "@components/ui/input";
import type { NextPage } from "next";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { SignUpSchema } from "@libs/input-schema";
import axios from "axios";
import { useUI } from "@contexts/ui.context";

interface IFormInput {
  email: string;
  username: string;
  password: string;
  confirmPassword: string;
}

const Register: NextPage = () => {
  const { setPageLoading } = useUI();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>({
    mode: "onChange",
    resolver: yupResolver(SignUpSchema),
  });

  async function onSubmit({ email, password, username }: IFormInput) {
    setPageLoading(true);
    try {
      const data = await axios.post("http://localhost:8080/users", {
        email,
        password,
        username,
        verified: false,
      });
      console.log(data);
    } catch (error: any) {
      console.log(error.response);
    } finally {
      setPageLoading(false);
    }
  }

  return (
    <section className="relative lg:h-screen lg:items-center grid grid-cols-12 container gap-5">
      <div className="w-full px-4 py-12 sm:px-6 lg:px-8 sm:py-16 lg:py-24 2xl:col-span-5 lg:col-span-6 md:col-span-12 col-span-12">
        <div className="">
          <h1 className="text-2xl font-bold sm:text-3xl">
            Join UForum community!
          </h1>

          <p className="mt-4 text-gray-500">
            Get more help and priviliges by joining to the most helpful UIU
            community
          </p>
        </div>

        <form
          noValidate
          onSubmit={handleSubmit(onSubmit)}
          className="mt-8 mb-0 space-y-4"
        >
          <div>
            <label htmlFor="username" className="sr-only">
              Username
            </label>

            <Input
              type="text"
              placeholder="Username"
              {...register("username")}
              errorKey={errors.username?.message}
            />
          </div>

          <div>
            <label htmlFor="email" className="sr-only">
              Email
            </label>

            <Input
              type="email"
              placeholder="Enter email"
              {...register("email")}
              icon={
                <span className="absolute inset-y-0 inline-flex items-center right-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-5 h-5 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                    />
                  </svg>
                </span>
              }
              errorKey={errors.email?.message}
            />
          </div>

          <div>
            <label htmlFor="password" className="sr-only">
              Password
            </label>
            <Input
              type="password"
              placeholder="Enter password"
              {...register("password")}
              errorKey={errors.password?.message}
              icon={
                <span className="absolute inset-y-0 inline-flex items-center right-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-5 h-5 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    />
                  </svg>
                </span>
              }
            />
          </div>

          <div>
            <label htmlFor="password" className="sr-only">
              Confirm Password
            </label>
            <Input
              placeholder="Repeat password"
              {...register("confirmPassword", {
                required: `repeat password is required`,
              })}
              errorKey={errors.confirmPassword?.message}
              icon={
                <span className="absolute inset-y-0 inline-flex items-center right-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-5 h-5 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    />
                  </svg>
                </span>
              }
            />
          </div>

          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-500">
              Already have an account?
              <a className="underline hover:text-secondary" href="">
                Sign in
              </a>
            </p>

            <Button type="submit" variant="secondary">
              Sign up
            </Button>
          </div>
        </form>
      </div>

      <div className="relative w-full h-full 2xl:col-span-7 lg:col-span-6 col-span-12">
        <img
          className="object-fill w-full h-full"
          src="/illustrations/register.svg"
          alt=""
        />
      </div>
    </section>
  );
};

export default Register;
