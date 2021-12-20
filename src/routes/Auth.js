import { createUserWithEmailAndPassword, FacebookAuthProvider, GithubAuthProvider, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { authService } from "myFirebase";
import React, { useState } from "react";

const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newAccount, setNewAccount] = useState(true);
  const [error, setError] = useState("");
  const onChange = (event) => {                   {/* input 값이 바뀔때마다 event가 발생한다. */}
    const {target: {name, value}} = event;
    if(name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  }
  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      let user;
      if(newAccount) {
        // create account
        await createUserWithEmailAndPassword(authService, email, password)
          .then((userCredential) => {
            user = userCredential.user;
        })
        console.log(user);
      } else {
        // log in
        await signInWithEmailAndPassword(authService, email, password)
          .then((userCredential) => {
            user = userCredential.user;
        })
      }
    }
    catch(error) {
      setError(error);
    }
  };
  const toggleAccount = () => setNewAccount((prev) => !prev);
  const onSocialClick = async (event) => {
    const {target: {name}} = event;
    let provider;
    if (name === "google") {
      provider = new GoogleAuthProvider();
    } else if (name === "github") {
      provider = new GithubAuthProvider();
    }
    const result = await signInWithPopup(authService, provider);
    console.log(result);
  }
  return (
    <div>
      <form onSubmit={onSubmit}>
        <input name="email" type="email" placeholder="Email" required value={email} onChange={onChange}/>
        <input name="password" type="password" placeholder="Password" required value={password} onChange={onChange}/>
        <input type="submit" value={newAccount ? "Create Account" : "Log In"} />
        {error}
      </form>
      <span onClick={toggleAccount}>{newAccount ? "로그인" : "회원가입"}</span>
      <div>
        <button onClick={onSocialClick} name="google">Continue with Google</button>
        <button onClick={onSocialClick} name="github">Continue with Github</button>
      </div>
    </div>
  )
}
export default Auth;