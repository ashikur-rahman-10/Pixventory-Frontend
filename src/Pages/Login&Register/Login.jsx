import { Link } from "react-router-dom";
import GoogleLogin from "../../Components/GoogleLogin/GoogleLogin";
import useAuth from "../../Hooks/UseAuth";
import { Helmet } from "react-helmet";

const Login = () => {
  const { login } = useAuth();
  const handleLogin = (e) => {
    e.preventDefault();
    console.log("clicked");
  };
  return (
    <div className="w-full mx-auto max-w-6xl px-4 pt-16 flex flex-col items-center justify-center min-h-[90vh]">
      <Helmet>
        <title>Pixventory | Login</title>
      </Helmet>
      <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
        <form onSubmit={handleLogin} className="card-body">
          <div className="form-control">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              type="email"
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
              placeholder="password"
              className="input input-bordered"
              required
            />
            <label className="label w-full text-center">
              <a
                href="#"
                className="label-text-alt link link-hover text-error text-center"
              >
                Forgot password?
              </a>
            </label>
          </div>
          <div className="form-control">
            <input
              type="submit"
              value={"Login"}
              className="btn btn-accent rounded-full text-white"
            ></input>
          </div>
          <div className="w-full text-center">
            <GoogleLogin />
            <Link to={'/register'} className="label-text-alt text-warning hover:text-gray-400 hover:underline">Create new account →</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
