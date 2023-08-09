import { useEffect } from "react";
import google from "../assets/images/google.png";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { postUserData } from "../api/api";
import { useAuth } from "../context/auth-context";

const SignUp1 = () => {
  const navigate = useNavigate();
  const { register: signup } = useAuth();

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  let signInError;

  const onSubmit = async (data) => {
    console.log("data : ", data);
    // const res = await postUserData({...data, passcode: data.password})
    const res = await signup({ ...data, passcode: data.password });
    console.log("res : ", res);
    if (!res.status) {
      signInError = <span className="text-red-500">{res.msg}</span>;
    }
  };

  return (
    <div className="flex justify-center items-center my-10">
      <div className="card w-[90%] bg-base-100 shadow-xl">
        <div className="card-body items-center ">
          <h2 className="card-title text-2xl">Sign Up</h2>

          <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Name</span>
              </label>
              <input
                type="text"
                placeholder="Your Name"
                className="input input-bordered w-full"
                {...register("name", {
                  required: {
                    value: true,
                    message: "Name is required",
                  },
                })}
              />
              <label className="label">
                {errors.name?.type === "required" && (
                  <span className="label-text-alt text-red-500 text-sm">
                    {errors.name.message}
                  </span>
                )}
              </label>
            </div>
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
            <div className="form-control w-full ">
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
            </div>
            {signInError}
            <input
              type="submit"
              className="btn btn-primary w-full mt-4 text-white"
              value="Sign Up"
            />
          </form>
          <p className="text-sm pt-2">
            Already have an Account?{" "}
            <Link className="text-sky-500" to="/login">
              Please Login
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

export default SignUp1;
