import useAuth from "../../hooks/useAuth";
import { Helmet } from "react-helmet";
import { useForm } from "react-hook-form";

type ResetFormData = {
  email: string;
};

const ForgetPassword = () => {
  const { sendResetPasswordEmail } = useAuth();

  const { register, handleSubmit } = useForm<ResetFormData>();

  const onSubmit = async (data: ResetFormData) => {
    const email = data?.email;
    sendResetPasswordEmail(email);
  };

  return (
    <div className=" min-h-screen flex justify-center items-center">
      <Helmet>
        <title>Forget Password | MetaBlog</title>
      </Helmet>
      <div className="dark:text-white">
        <div className="bg-[#E8E8EA] dark:bg-[#242535] rounded-2xl font-Montserrat">
          <div className="bg-[#E8E8EA] dark:bg-[#242535] rounded-2xl shadow-lg xs:py-4 py-5  sm:p-5 items-center">
            {/* form */}
            <div className="px-8">
              <h1 className="font-bold text-2xl text-blue-600 dark:text-white text-center">
                Send Reset Password Email
              </h1>
              <form
                className="flex flex-col gap-4"
                onSubmit={handleSubmit(onSubmit)}
              >
                <input
                  className="appearance-none focus:outline-none p-2 mt-8 border rounded-xl text-black font-medium dark:text-blue-900"
                  type="email"
                  placeholder="Email"
                  {...register("email", { required: true })}
                />

                <button className="rounded-xl text-[#F0E3CA]  bg-blue-600 transition-all hover:bg-blue-500 py-2 hover:scale-105 duration-300">
                  Send
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgetPassword;
