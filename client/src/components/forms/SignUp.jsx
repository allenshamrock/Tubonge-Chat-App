import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { PulseLoader } from "react-spinners";

import Input from "components/common/Input";
import Button from "components/common/Button";
import AvartarUploadForm from " components/forms/AvartarUploadForm";
import Error from "components/common/Error";
import { signUpAction, clearMessage } from "reduxStore/actions/authActions";
import { SIGN_UP_FAIL } from "reduxStore/constants/authConstants";
const SignUp = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [password, setPassword] = useState("");
  const [avatar, setAvatar] = useState("");
  const [loading, setLoading] = useState(false);

  const errorMessage = useSelector((state) => state.auth.errorMessage);
  const onSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return null;
    setLoading(true);
    const formData = new FormData();
    formData.append("username", username);
    formData.append("name", name);
    formData.append("bio", bio);
    formData.append("password", password);
    formData.append("avatar", avatar);

    await dispatch(signUpAction(formData, navigate));
    setLoading(false);
  };

  const handleClearMessages = () => {
    dispatch(clearMessage());
  };

  const validateForm = () => {
    handleClearMessages();
    if (username.length < 3) {
      dispatch({
        type: SIGN_UP_FAIL,
        payload: "Username must be atleast 3 characters long",
      });
      return false;
    }
    if (password.length < 6) {
      dispatch({
        type: SIGN_UP_FAIL,
        payload: "Password must be atleast 6 characters long",
      });
      return false;
    }

    if (name.length < 3) {
      dispatch({
        type: SIGN_UP_FAIL,
        payload: "Name must be atleast 3 characters long",
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
      {errorMessage && (
        <Error errorMessage={errorMessage} onClick={handleClearMessages} />
      )}
      <AvartarUploadForm setAvatar={setAvatar} />
      <Input
        type="text"
        placeholder="username"
        value="username"
        required
        onChange={(e) => setUsername(e.target.value)}
      />
      <Input
        type="text"
        placeholder="name"
        value="name"
        required
        onChange={(e) => setName(e.target.value)}
      />
      <Input
        type="text"
        placeholder="password"
        value="password"
        required
        onChange={(e) => setPassword(e.target.value)}
      />
      <Input
        type="text"
        placeholder="bio"
        value="bio"
        required
        onChange={(e) => setBio(e.target.value)}
      />
      <Button type="submit" disabled="loading">
        {loading ? (
          <>
            <span>Signing up...</span>
            <PulseLoader size={7} color="white" />
          </>
        ) : (
          <span>Sign up</span>
        )}
      </Button>
      <div className="space-x-2">
        <span className="text-white text-sm">Already have an account? </span>
        <Link to={"/sign-in"} className="text-main-green font-semibold">
          Sign in
        </Link>
      </div>
    </form>
  );
};

export default SignUp;
