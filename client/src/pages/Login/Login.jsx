import { Link, useLocation, useNavigate } from "react-router-dom";
import "./login.scss";
import { useContext } from "react";
import { AuthContext } from "../../Providers/AuthProvider";
import { Helmet } from "react-helmet";
import { FaGoogle } from "react-icons/fa";
import { toast } from "react-hot-toast";

const Login = () => {
  const location = useLocation();
  const navigate = useNavigate();
  let from = location.state?.from?.pathname || "/";

  const { signInUser, handleGoogleSignIn } = useContext(AuthContext);
  const handleLogin = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    signInUser(email, password)
      .then(() => {
        toast.success("Login Successful!");
        navigate(from, { replace: true });
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  const handleGoogle = () => {
    handleGoogleSignIn().then(() => {
      toast.success("Login Successful!");
      navigate(from, { replace: true });
    });
  };

  return (
    <div className="hero min-h-screen bg-base-200">
      <Helmet>
        <title>Login | MetaBlog</title>
      </Helmet>
      <div className="hero-content flex-col lg:flex-row">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold">Login Now!</h1>
        </div>
        <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
          <form className="card-body" onSubmit={handleLogin}>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                name="email"
                placeholder="email"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                name="password"
                placeholder="password"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control mt-6">
              <button className="btn register-btn normal-case">Login</button>
            </div>
          </form>
          <p className="text-center mb-3">
            New here?{" "}
            <Link
              className="hover:text-white p-1 hover:bg-[#1976D2]"
              to="/register"
            >
              Register
            </Link>
          </p>
          <p className="text-center mb-2">or</p>
          <button className="btn mb-10" onClick={() => handleGoogle()}>
            <FaGoogle /> sign In
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
