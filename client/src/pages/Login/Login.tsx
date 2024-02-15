import { Link, useLocation, useNavigate } from "react-router-dom";

import { FC, useContext, useState } from "react";
import { AuthContext } from "../../Providers/AuthProvider";
import { Helmet } from "react-helmet";
import { FaGoogle, FaRegEye, FaRegEyeSlash } from "react-icons/fa";

import { useForm } from "react-hook-form";

export interface FormData {
  email: string;
  password: string;
}

const Login: FC = (): JSX.Element => {
  const location = useLocation();
  const navigate = useNavigate();

  const from = location.state?.from?.pathname || "/";

  const [showPass, setShowPass] = useState<boolean>(false);
  const { register, handleSubmit } = useForm<FormData>();

  const { signInUser, handleGoogleSignIn } = useContext(AuthContext);

  const handleGoogleLogin = async () => {
    await handleGoogleSignIn();
    navigate(from, { replace: true });
  };

  const onSubmit =  async(data: FormData) => {
    const email = data?.email;
    const password = data?.password;

    const result =await signInUser(email, password);
    if (result) {
      navigate(from, { replace: true });
    }
  };

  return (
    <div className=" min-h-screen flex justify-center items-center">
      <Helmet>
        <title>Login | MetaBlog</title>
      </Helmet>
      <div className="dark:text-white">
        <div className="bg-[#E8E8EA] dark:bg-[#242535] rounded-2xl font-Montserrat">
          {/* login container */}

          <div className="bg-[#E8E8EA] dark:bg-[#242535] rounded-2xl shadow-lg xs:py-4 py-5  sm:p-5 items-center">
            {/* form */}
            <div className="px-8">
              <h1 className="font-bold text-2xl text-blue-600 dark:text-white text-center">
                Login
              </h1>
              <p className="text-sm mt-4 font-medium">
                Have an account? Log in to continue
              </p>
              <form
                className="flex flex-col gap-4"
                onSubmit={handleSubmit(onSubmit)}
              >
                <input
                  className="appearance-none focus:outline-none p-2 mt-8 border rounded-xl text-black font-medium"
                  type="email"
                  placeholder="Email"
                  {...register("email", { required: true })}
                />
                <div className="relative">
                  <input
                    className="appearance-none focus:outline-none p-2 border rounded-xl w-full text-black font-medium"
                    type={showPass ? "text" : "password"}
                    id=""
                    placeholder="Password"
                    {...register("password", { required: true })}
                  />
                  {showPass ? (
                    <FaRegEyeSlash
                      className="absolute top-1/2 right-3 cursor-pointer -translate-y-1/2 text-gray-500"
                      onClick={() => setShowPass((prev) => !prev)}
                    />
                  ) : (
                    <FaRegEye
                      className="absolute top-1/2 right-3 cursor-pointer -translate-y-1/2 text-gray-500"
                      onClick={() => setShowPass((prev) => !prev)}
                    />
                  )}
                </div>
                <button className="rounded-xl text-[#F0E3CA]  bg-blue-600 transition-all hover:bg-blue-500 py-2 hover:scale-105 duration-300">
                  Login
                </button>
              </form>
              <div className="mt-10 grid grid-cols-3 text-gray-500 items-center">
                <hr className="border border-black dark:border-white" />
                <p className="text-center text-black dark:text-white text-sm">
                  OR
                </p>
                <hr className="border border-black dark:border-white" />
              </div>
              <div className="text-white dark:text-white">
                <button
                  onClick={() => handleGoogleLogin()}
                  className=" py-2 w-full rounded-xl mt-5 flex justify-center items-center hover:scale-105 duration-300  bg-blue-600 hover:bg-blue-500 transition-all hover:text-[#F0E3CA]"
                >
                  <FaGoogle className="w-[25px] mr-1 text-sm" />
                  Login in with google
                </button>
              </div>
              <a href="">
                <div className="mt-10 text-sm border-b border-gray-400 py-4">
                  Forgot your password ?
                </div>
              </a>
              <div className="text-xs mt-3 flex justify-between items-center">
                <p>If you dont have an account....</p>
                <Link to="/register">
                  <button className="py-2 px-5 bg-blue-600 rounded-xl hover:bg-blue-500 text-white hover:text-[#F0E3CA] transition-all hover:scale-110 duration-300">
                    Signup
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
