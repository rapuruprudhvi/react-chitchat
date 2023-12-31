import React, { useState } from "react";
// import GoogleSignin from "../img/btn_google_signin_dark_pressed_web.png";
import { auth } from "./firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { GoogleAuthProvider, signInWithRedirect } from "firebase/auth";

const NavBar = () => {
  const [user] = useAuthState(auth);
  const googleSignIn = () => {
    const provider = new GoogleAuthProvider();
    signInWithRedirect(auth, provider);
  };
  const signOut = () => {
    auth.signOut();
  };
  return (
    <nav className="nav-bar">


      {user ? (
         <i className="bi bi-box-arrow-right" onClick={signOut}   style={{fontSize:"25px"}} ></i>

      ) : (
        <button className="sign-in">
          <p
            onClick={googleSignIn}
            // src={GoogleSignin}
            alt="sign in with google"
            type="button"
          >googleSignIn</p>
        </button>
      )}
    </nav>
  );
};
export default NavBar;