import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { PulseLoader } from "react-spinners";
import Input from "components/common/Input";
import Button from "components/common/Button";
import Error from "components/common/Error";

import { signInActions, clearMessage } from "reduxStore/actions/authActions";
import { SIGN_IN_FAIL } from "reduxStore/constants/authConstants";
const SignIn = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const error = useSelector((state) => state.auth.errorMessage);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return null;
    setLoading(true);
    const formData = new formData();
    formData.append("username", username);
    formData.append("password", password);

    await dispatch(signInActions(formData, navigate));
    setLoading(false);
  };

  const handleClearMessages = () => {
    clearMessage();
  };

  const validateForm = () => {
    handleClearMessages();
    if (username.length < 3) {
      dispatch({
        type: SIGN_IN_FAIL,
        payload: "Username must be atleast 3 characters long",
      });
      return false;
    }

    if (password.length < 6) {
      dispatch({
        type: SIGN_IN_FAIL,
        payload: "Passwor must be atleast 6 characters long",
      });
      return false;
    }
    return true;
  };

  useEffect(() => {
    handleClearMessages();
  }, []);
  return (
    <form className="flex flex-col items-center gap-6 my-4" onSubmit={onSubmit}>
      {error && <Error errorMessage={error} onClick={handleClearMessages} />}
      <Input
        type="text"
        placeholder="username"
        value="username"
        onChange={(e) => setUsername(e.target.value)}
      />
      <Input
        type="text"
        placeholder="password"
        value="password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button type="submit" disabled={loading}>
        {loading ? (
          <>
            <span>Signing in....</span>
            <PulseLoader size={7} color="white" />
          </>
        ) : (
          <span>Sign in</span>
        )}
      </Button>
      <div className="space-x-2">
        <span className="text-sm text-white">Don't have an account?</span>
        <Link to={"/sign-up"} className="text-main-green font-semibold">
          Sign up
        </Link>
      </div>
    </form>
  );
};

export default SignIn;
