import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { authService } from "myFirebase";
import React, { useState } from "react";

const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newAccount, setAccount] = useState(true);
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
      console.log(error);
    };
  };
  return (
    <div>
      <form onSubmit={onSubmit}>
        <input name="email" type="email" placeholder="Email" required value={email} onChange={onChange}/>
        <input name="password" type="password" placeholder="Password" required value={password} onChange={onChange}/>
        <input type="submit" value={newAccount ? "Create Account" : "Log In"} />
      </form>
      <div>
        <button>Continue with Google</button>
        <button>Continue with Github</button>
      </div>
    </div>
  )
}
export default Auth;