import React from "react";
import { authService } from "myFirebase";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";

export default () => {
  const navigate = useNavigate();
  const onLogOutClick = () => {
    signOut(authService).then(() => {
      // Sign Out Successfull.
      navigate("/");
    }).catch((error) => {
      console.log(error);
    })
  }
  return (
    <>
      <button onClick={onLogOutClick}>Log Out</button>
    </>
  )
}