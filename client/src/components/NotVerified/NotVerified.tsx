import { Helmet } from "react-helmet";
import useAuth from "../../hooks/useAuth";

const NotVerified = () => {
  const { sendVerificationEmail } = useAuth();

  return (
    <div className="my-10">
      <Helmet>
        <title>Add Blog | MetaBlog</title>
      </Helmet>
      <div className="min-h-screen flex justify-center items-center">
        <div className="card w-full">
          <h1 className="dark:text-white text-center text-2xl font-semibold">
            You can't add blog without verifying your email address.
            <br />
            Check your email to verify your account.
          </h1>
          <button
            onClick={() => sendVerificationEmail()}
            className="mt-5 py-2 px-5 inline-block w-32 mx-auto bg-blue-600 rounded-xl hover:bg-blue-500 text-white hover:text-[#F0E3CA] transition-all hover:scale-110 duration-300"
          >
            Send Link
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotVerified;
