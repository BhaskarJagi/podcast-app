import React from "react";
import Header from "../components/common/Header";
import { useSelector } from "react-redux";
import Button from "../components/common/Button";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { toast } from "react-toastify";

function ProfilePage() {
  const user = useSelector((state) => state.user.user);

  function handleLogout(){
    signOut(auth).then(() => {
      // Sign-out successful.
      toast.success("User Logged Out.")
    }).catch((error) => {
      // An error happened.
      toast.error(error.message)
    });
  }

  if (!user) {
    return <p>Loading...</p>;
  } else {
    return (
      <div>
        <Header />
        <h1>Full Name: {user.name}</h1>
        <h2>Email: {user.email}</h2>
        <h2>UId: {user.uid}</h2>
        <Button text={"Logout"} onClick={handleLogout}/>
      </div>
    );
  }
}

export default ProfilePage;
