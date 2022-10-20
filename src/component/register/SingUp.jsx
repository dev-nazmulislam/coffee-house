import "../login/login.scss";
import React from "react";
import {
  useCreateUserWithEmailAndPassword,
  useUpdateProfile,
} from "react-firebase-hooks/auth";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import auth from "../../firebase.init";
import SocialLogin from "../socialLogin/SocialLogin";

const SingUp = () => {
  const [createUserWithEmailAndPassword, user, loading, error] =
    useCreateUserWithEmailAndPassword(auth, { sendEmailVerification: true });
  const [updateProfile, updating, updateError] = useUpdateProfile(auth);

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const navigate = useNavigate();

  let signInError;

  if (loading || updating) {
    return <p>Loading</p>;
  }

  if (error || updateError) {
    signInError = (
      <p className="text-red-500">
        <small>{error?.message || updateError?.message}</small>
      </p>
    );
  }

  if (user) {
    navigate("/");
  }

  const onSubmit = async (data) => {
    await createUserWithEmailAndPassword(data.email, data.password);
    await updateProfile({ displayName: data.name });
  };
  return (
    <div className="login-container">
      <div className="card">
        <div className="card-content">
          <h2>Sign Up</h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-content">
              <label>Name</label>
              <input
                type="text"
                placeholder="Your Name"
                {...register("name", {
                  required: {
                    value: true,
                    message: "Name is Required",
                  },
                })}
              />
              <label>
                {errors.name?.type === "required" && (
                  <span style={{ color: "red" }}>{errors.name.message}</span>
                )}
              </label>
            </div>

            <div className="form-content">
              <label className="label">Email</label>
              <input
                type="email"
                placeholder="Your Email"
                {...register("email", {
                  required: {
                    value: true,
                    message: "Email is Required",
                  },
                  pattern: {
                    value: /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/,
                    message: "Provide a valid Email",
                  },
                })}
              />
              <label>
                {errors.email?.type === "required" && (
                  <span style={{ color: "red" }}>{errors.email.message}</span>
                )}
                {errors.email?.type === "pattern" && (
                  <span style={{ color: "red" }}>{errors.email.message}</span>
                )}
              </label>
            </div>
            <div className="form-content">
              <label>Password</label>
              <input
                type="password"
                placeholder="Password"
                {...register("password", {
                  required: {
                    value: true,
                    message: "Password is Required",
                  },
                  minLength: {
                    value: 6,
                    message: "Must be 6 characters or longer",
                  },
                })}
              />
              <label>
                {errors.password?.type === "required" && (
                  <span style={{ color: "red" }}>
                    {errors.password.message}
                  </span>
                )}
                {errors.password?.type === "minLength" && (
                  <span style={{ color: "red" }}>
                    {errors.password.message}
                  </span>
                )}
              </label>
            </div>

            {signInError}
            <input className="button" type="submit" value="Sign Up" />
          </form>
          <p>
            Already have an account?{" "}
            <Link className="link-button" to="/login">
              Please login
            </Link>
          </p>
          <SocialLogin />
        </div>
      </div>
    </div>
  );
};

export default SingUp;
