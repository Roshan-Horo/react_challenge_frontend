import { useEffect } from "react";
import google from "../assets/images/google.png";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import auth from "../firebase.init";
// import useToken from "../../hooks/useToken";
import Loading from "../utils/Loading";
import { useAuth } from "../context/auth-context";

const Login1 = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const {
    register,
    formState: { errors },
    handleSubmit,
    getValues,
  } = useForm();

  const handleResetPassword = async () => {
    const email = getValues("email");

    if (email) {
      await sendPasswordResetEmail(email);
      toast.success("Password Reset Email Send!");
    } else {
      toast.error("Please enter your email");
    }
  };

  let signInError;
  const onSubmit = async (data) => {
    // signInWithEmailAndPassword(data.email, data.password);
    const res = await login({ ...data, passcode: data.password });
  };

  return (
    <div className="flex justify-center items-center my-10">
      <div className="card w-[90%] bg-base-100 shadow-xl">
        <div className="card-body items-center ">
          <h2 className="card-title text-2xl">Login</h2>

          <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                placeholder="Email Address"
                className="input input-bordered w-full"
                {...register("email", {
                  required: {
                    value: true,
                    message: "Email is required",
                  },
                  pattern: {
                    value: /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/,
                    message: "Provide a valid email",
                  },
                })}
              />
              <label className="label">
                {errors.email?.type === "required" && (
                  <span className="label-text-alt text-red-500 text-sm">
                    {errors.email.message}
                  </span>
                )}
                {errors.email?.type === "pattern" && (
                  <span className="label-text-alt text-red-500 text-sm">
                    {errors.email.message}
                  </span>
                )}
              </label>
            </div>
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                placeholder="Password"
                className="input input-bordered w-full"
                {...register("password", {
                  required: {
                    value: true,
                    message: "Password is required",
                  },
                  minLength: {
                    value: 6,
                    message: "Password should be contains 6 characters",
                  },
                })}
              />
              <label className="label">
                {errors.password?.type === "required" && (
                  <span className="label-text-alt text-red-500 text-sm">
                    {errors.password.message}
                  </span>
                )}
                {errors.password?.type === "minLength" && (
                  <span className="label-text-alt text-red-500 text-sm">
                    {errors.password.message}
                  </span>
                )}
              </label>
              <button
                type="button"
                onClick={handleResetPassword}
                className="btn text-sky-500 btn-link normal-case text-left"
              >
                <p>Forget Password?</p>
              </button>
            </div>

            {signInError}
            <input
              type="submit"
              className="btn btn-primary w-full mt-4 text-white"
              value="Login"
            />
          </form>
          <p className="text-sm pt-2">
            New to React Challenge?{" "}
            <Link className="text-sky-500" to="/signup">
              Create new account
            </Link>
          </p>

          <div className="divider">OR</div>
          <button
            className="btn btn-outline w-full"
            onClick={() => signInWithGoogle()}
          >
            <div className="flex justify-center items-center gap-3">
              <img className="w-[8%]" src={google} alt="" />
              <h1 className="capitalize text-xl text-gray-600">Google</h1>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login1;
