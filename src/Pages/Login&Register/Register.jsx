import { Link } from "react-router-dom";
import GoogleLogin from "../../Components/GoogleLogin/GoogleLogin";
import useAuth from "../../Hooks/UseAuth";
import { Helmet } from "react-helmet";

const Register = () => {
    const { login } = useAuth();
    const handleLogin = (e) => {
        e.preventDefault();
        console.log("clicked");
    };
    return (
        <div className="w-full mx-auto max-w-6xl px-4 pt-16 flex flex-col items-center justify-center min-h-[90vh]">
            <Helmet>
                <title>Pixventory | Register</title>
            </Helmet>
            <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                <form onSubmit={handleLogin} className="card-body">
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Name</span>
                        </label>
                        <input
                            type="text"
                            placeholder="name"
                            className="border border-accent py-1 px-2 rounded-md"
                            required
                        />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Email</span>
                        </label>
                        <input
                            type="email"
                            placeholder="email"
                            className="border border-accent py-1 px-2 rounded-md"
                            required
                        />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Image</span>
                        </label>
                        <input
                            type="file"
                            placeholder="images"
                            className="border border-accent py-1 px-2 rounded-md"
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
                            className="border border-accent py-1 px-2 rounded-md"
                            required
                        />

                    </div>
                    <div className="form-control">
                        <input
                            type="submit"
                            value={"Register"}
                            className="btn btn-accent  rounded-full text-white"
                        ></input>
                    </div>
                    <GoogleLogin />
                    <div className="w-full text-center">
                        <Link to={'/login'} className="label-text-alt text-warning hover:text-gray-400 hover:underline">Already have an account? Login →</Link>
                    </div>

                </form>
            </div>
        </div>
    );
};

export default Register;
