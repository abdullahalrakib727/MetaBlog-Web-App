import { FC, useContext, useState } from "react";
import { Helmet } from "react-helmet";
import { Link, useLocation, useNavigate } from "react-router-dom";

import { AuthContext } from "../../Providers/AuthProvider";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

import { useForm } from "react-hook-form";



interface FormData {
  name: string;
  email: string;
  photo: string;
  password: string;

}

const Register: FC = (): JSX.Element => {
  
  const { registerUser, updateUserProfile, sendVerificationEmail } =
    useContext(AuthContext);
    
  const location = useLocation();
  const navigate = useNavigate();

  const [showPass, setShowPass] = useState<boolean>(false);
  const { register, handleSubmit } = useForm<FormData>();

  const from = location.state?.from?.pathname || "/";

  const onSubmit = async (data:FormData) => {
    const name = data?.name;
    const photo = data?.photo;
    const email = data?.email;
    const password = data?.password;

    await registerUser(email, password);

    await sendVerificationEmail();

    await updateUserProfile(name, photo);

    navigate(from, { replace: true });
  };

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
                  {...register("name", { required: true })}
                />
                <input
                  className="appearance-none focus:outline-none p-2 border rounded-xl text-black font-medium"
                  type="email"
                  placeholder="Email"
                  {...register("email", { required: true })}
                />
                <input
                  className="appearance-none focus:outline-none p-2 border rounded-xl text-black font-medium"
                  type="text"
                  placeholder="Photo URL"
                  {...register("photo", { required: true })}
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
                <button className="rounded-xl text-[#F0E3CA]  transition-all bg-blue-600 hover:bg-blue-500 py-2 hover:scale-105 duration-300">
                  Signup
                </button>
              </form>
              <div className="mt-5 text-sm border-b border-gray-400 py-4">
              <Link to="/forget" className="text-black dark:text-white">Forgot your password ?</Link>
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
