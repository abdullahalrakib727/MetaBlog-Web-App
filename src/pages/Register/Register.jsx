import { useContext } from "react";
import { Helmet } from "react-helmet";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Swal from "sweetalert2";
import { AuthContext } from "../../Providers/AuthProvider";
import { FaGoogle } from "react-icons/fa";

const Register = () => {
  const { registerUser, updateUserProfile ,handleGoogleSignIn} = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();
  const handleGoogle = ()=>{
    handleGoogleSignIn().then(()=>{
      Swal.fire({
        title: "Log in Successful!",
        icon: "success"
      });

      
      setTimeout(() => {
        navigate(location?.state ? location.state : "/");
      }, 2000);
    });
    
  }
  const handleRegister = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const photoUrl = e.target.photo.value;
    const email = e.target.email.value;
    const password = e.target.password.value;
    // console.log({ name, photoUrl, email, password });

    const hasNoCapital = /^(?:(?![A-Z]).)*$/.test(password);

    const hasNoSpecialChar = /^[^!@#$%^&*(),.?":{}|<>]*$/.test(password);

    const hasNoNumericChar = /^[^\d]*$/.test(password);

    if (password.length < 6) {
      Swal.fire("Your password is less than 6 character!");
      return;
    } else if (hasNoCapital) {
      Swal.fire("Your password has no capital letter!");
      return;
    } else if (hasNoSpecialChar) {
      Swal.fire("Your password has no special character!");
      return;
    } else if (hasNoNumericChar) {
      Swal.fire("Your password doesn't contain a number!");
      return;
    }

    registerUser(email, password)
      .then((result) => {
        updateUserProfile(name, photoUrl);

        if (result.user) {
          toast.success("Registration successful!", {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          setTimeout(() => {
            navigate(location?.state ? location.state : "/");
          }, 2000);
        }
      })
      .catch(() => {
        Swal.fire({
          title: "User Already Exits!!!!",
          text: "User with this email already has an account on this website",
          icon: "error",
        });
      });
  };

  return (
    <div className="hero min-h-screen bg-base-200">
      <Helmet>
        <title>Blog-Zone || Register</title>
      </Helmet>
      <div className="hero-content flex-col lg:flex-row">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold">Register Here!</h1>
        </div>
        <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
          <form className="card-body" onSubmit={handleRegister}>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Name</span>
              </label>
              <input
                type="text"
                placeholder="Your Name"
                name="name"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Photo Url</span>
              </label>
              <input
                type="text"
                name="photo"
                placeholder="link of your image"
                className="input input-bordered"
                required
              />
            </div>
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
              <button className="btn register-btn normal-case">Register</button>
            </div>
          </form>
          <div className="text-center mb-10">
            Already Have Account ?{" "}
            <Link
              className="hover:text-white p-1 hover:bg-[#1976D2]"
              to="/login"
            >
              Login
            </Link>
      <p className="text-center mb-2">or</p>
      <button className="btn mb-10" onClick={()=>handleGoogle()}><FaGoogle/> Register</button>
          </div>
        </div>
      </div>
      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
};

export default Register;
