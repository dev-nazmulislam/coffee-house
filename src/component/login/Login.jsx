import "./login.scss";
import React, { useEffect, useRef } from "react";
import {
  useSendPasswordResetEmail,
  useSignInWithEmailAndPassword,
} from "react-firebase-hooks/auth";
import { useForm } from "react-hook-form";
import { Link, useNavigate, useLocation } from "react-router-dom";
import auth from "../../firebase.init";
import SocialLogin from "../socialLogin/SocialLogin";

const Login = () => {
  const [signInWithEmailAndPassword, user, loading, error] =
    useSignInWithEmailAndPassword(auth);

  const [sendPasswordResetEmail, sending, error2] =
    useSendPasswordResetEmail(auth);

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  let signInError;
  const navigate = useNavigate();
  const location = useLocation();
  let from = location.state?.from?.pathname || "/";

  useEffect(() => {
    if (user) {
      navigate(from, { replace: true });
    }
  }, [user, from, navigate]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    signInError = (
      <p className="text-red-500">
        <small>{error?.message}</small>
      </p>
    );
  }

  const onSubmit = (data) => {
    signInWithEmailAndPassword(data.email, data.password);
  };

  async function handlePasswordReset() {
    const email = prompt("Please enter your Email");
    if (email) {
      await sendPasswordResetEmail(email);
      alert("Sent email");
      navigate(from, { replace: true });
    } else {
      alert("Please provide a email.");
    }
  }
  return (
    <div className="login-container">
      <div className="card">
        <div className="card-content">
          <h2>Login</h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-content">
              <label>Email</label>
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
            <input className="button" type="submit" value="Login" />
          </form>
          <p>
            <span>Coffee House </span>
            <Link className="link-button" to="/signup">
              Create New Account
            </Link>
          </p>
          <p>
            Forget your password?{" "}
            <button onClick={handlePasswordReset}>Reset Password</button>
          </p>
          {<SocialLogin />}
        </div>
      </div>
    </div>
  );
};

export default Login;
