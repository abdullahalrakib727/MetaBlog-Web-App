import { FC } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";

import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

import { ImSpinner } from "react-icons/im";
import { useRegister } from "../../hooks/useRegister";

const Register: FC = (): JSX.Element => {
  const {
    loading,
    showPass,
    register,
    handleSubmit,
    onSubmit,
    setShowPass,
    errors,
  } = useRegister();

  return (
    <div className="min-h-screen flex justify-center items-center">
      <Helmet>
        <title>Register | MetaBlog</title>
      </Helmet>
      <div className="dark:text-white">
        <div className="bg-[#E8E8EA] dark:bg-[#242535] rounded-2xl font-Montserrat">
          {/* login container */}

          <div className="bg-[#E8E8EA] dark:bg-[#242535] rounded-2xl shadow-lg xs:py-4 py-5  sm:p-5 items-center">
            {/* form */}
            <div className="px-8">
              <h1 className="font-bold text-2xl text-blue-600 dark:text-white text-center">
                Signup
              </h1>
              <p className="text-sm mt-4 font-medium">
                New Here? Signup and discover a new world of blogging
              </p>
              <form
                className="flex flex-col gap-4"
                onSubmit={handleSubmit(onSubmit)}
              >
                <input
                  className="appearance-none focus:outline-none p-2 mt-8 border rounded-xl text-black font-medium"
                  type="text"
                  placeholder="Name"
                  {...register("name", { required: "Name is required" })}
                />
                {errors.name && (
                  <p className="text-red-600 ">{errors.name.message}</p>
                )}
                <input
                  className="appearance-none focus:outline-none p-2 border rounded-xl text-black font-medium "
                  type="email"
                  placeholder="Email"
                  {...register("email", { required: "Email is required" })}
                />
                {errors.email && (
                  <p className="text-red-600 ">{errors.email.message}</p>
                )}
                <span className="">
                  <input
                    className="appearance-none focus:outline-none p-2 border rounded-xl text-black font-medium bg-white w-full"
                    type="file"
                    accept="image/*"
                    {...register("photo", { required: "Photo is required" })}
                  />
                  {errors.photo && (
                    <p className="text-red-600 ">{errors.photo.message}</p>
                  )}
                </span>
                <div className="relative">
                  <input
                    className="appearance-none focus:outline-none p-2 border rounded-xl w-full text-black font-medium"
                    type={showPass ? "text" : "password"}
                    placeholder="Password"
                    {...register("password", {
                      required: "Password is required",
                    })}
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
                {errors.password && (
                  <p className="text-red-600 ">{errors.password.message}</p>
                )}
                <button className="rounded-xl text-[#F0E3CA]  transition-all bg-blue-600 hover:bg-blue-500 py-2 hover:scale-105 duration-300">
                  {loading ? (
                    <ImSpinner className="animate-spin m-auto" />
                  ) : (
                    "Signup"
                  )}
                </button>
              </form>
              <div className="mt-5 text-sm border-b border-gray-400 py-4">
                <Link to="/forget" className="text-black dark:text-white">
                  Forgot your password ?
                </Link>
              </div>
              <div className="text-xs mt-3 flex justify-between items-center">
                <p>If you already have an account...</p>
                <Link to="/login">
                  <button className="py-2 px-5 transition-all bg-blue-600 rounded-xl hover:bg-blue-500 text-white hover:text-[#F0E3CA] hover:scale-110 duration-300">
                    login
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

export default Register;
