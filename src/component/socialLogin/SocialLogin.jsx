import { useEffect } from "react";
import { useSignInWithGoogle } from "react-firebase-hooks/auth";
import { useLocation, useNavigate } from "react-router-dom";
import GoogleIcon from "@mui/icons-material/Google";
import auth from "../../firebase.init";
import "./socialLogin.scss";

const SocialLogin = () => {
  const [signInWithGoogle, user, loadding, error] = useSignInWithGoogle(auth);
  const navigate = useNavigate();
  const location = useLocation();

  let from = location.state?.from?.pathname || "/";

  let signInError;

  useEffect(() => {
    if (user) {
      navigate(from, { replace: true });
    }
  }, [user, from, navigate]);

  if (loadding) {
    return <p>Loading..</p>;
  }

  if (error) {
    signInError = (
      <p>
        <small>{error?.message}</small>
      </p>
    );
  }
  const googleSingin = () => {
    signInWithGoogle();
  };
  return (
    <div>
      {signInError}
      <div>
        <button onClick={googleSingin} className="btn">
          <GoogleIcon className="icon" />
          <span>Google</span>
        </button>
      </div>
    </div>
  );
};

export default SocialLogin;
