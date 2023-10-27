import React, { useState } from "react";
import InputComponent from "../../common/Input";
import Button from "../../common/Button";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../../firebase";
import { doc, getDoc } from "firebase/firestore";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setUser } from "../../../slices/userSlice";
import { toast } from "react-toastify";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoaading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  async function handleLogin() {
    setLoaading(true);
    if (email && password) {
      try {
        const userCredential = await signInWithEmailAndPassword(
          auth,
          email,
          password
        );
        const user = userCredential.user;

        const userDoc = await getDoc(doc(db, "users", user.uid));
        const userData = userDoc.data();
        console.log("userData>>>", userData);

        dispatch(
          setUser({
            name: userData.name,
            email: user.email,
            uid: user.uid,
          })
        );
        toast.success("Login successful.");
        setLoaading(false);
        navigate("/profile");
      } catch (error) {
        const errorMessage = error.message;
        toast.error(errorMessage);
        setLoaading(false);
      }
    } else {
      toast.error("All fields are required!");
      setLoaading(false);
    }
  }

  return (
    <>
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
      <Button
        text={loading ? "Loading..." : "Login"}
        disabled={loading}
        onClick={handleLogin}
      />
    </>
  );
}

export default LoginForm;
