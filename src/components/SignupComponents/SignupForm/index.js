import React, { useState } from "react";
import InputComponent from "../../common/Input";
import Button from "../../common/Button";
import { auth, db, storage } from "../../../firebase.js";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setUser } from "../../../slices/userSlice";
import { toast } from "react-toastify";

function SignupForm() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  async function handleSignup() {
    setLoading(true);
    if (password === confirmPassword && password.length >= 6) {
      try {
        //creating user's account
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        const user = userCredential.user;
        console.log("user>>>", user);

        setFullName("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");

        //saving user's details
        await setDoc(doc(db, "users", user.uid), {
          name: fullName,
          email: user.email,
          uid: user.uid,
        });

        dispatch(
          setUser({
            name: fullName,
            email: user.email,
            uid: user.uid,
          })
        );
        toast.success("User created successfully.");
        setLoading(false);
        navigate("/profile");
      } catch (error) {
        const errorMessage = error.message;
        toast.error(errorMessage);
        setLoading(false);
      }
    } else {
      if (password !== confirmPassword) {
        toast.error("Password and Confirm Password must be same.");
      } else if (password.length < 6) {
        toast.error("Length of password must be more than 6 digits.");
      }
      setLoading(false);
    }
  }

  return (
    <>
      <InputComponent
        state={fullName}
        setState={setFullName}
        placeholder="Full Name"
        type="text"
        required={true}
      />
      <InputComponent
        state={email}
        setState={setEmail}
        placeholder="Email"
        type="email"
        required={true}
      />
      <InputComponent
        state={password}
        setState={setPassword}
        placeholder="Password"
        type="password"
        required={true}
      />
      <InputComponent
        state={confirmPassword}
        setState={setConfirmPassword}
        placeholder="Confirm Password"
        type="password"
        required={true}
      />
      <Button
        text={loading ? "Loading..." : "Signup"}
        disabled={loading}
        onClick={handleSignup}
      />
    </>
  );
}

export default SignupForm;
