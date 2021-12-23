import React, { useEffect, useState } from "react";
import AppRouter from "components/Router";
import { authService } from "myFirebase";

function App() {
  const [init, setInit] = useState(false);
  const [isLoggedIn, setIsLoggedIn ] = useState(false);
  const [userObj, setUserObj] = useState(null);
  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if (user) {             // user가 존재하면 ( 로그인 상태 true ) => 로그인
        setIsLoggedIn(true);
        setUserObj(user);
      } else {                // user가 존재하지 않으면 ( 로그인 상태 false ) => 로그아웃
        setIsLoggedIn(false);
      }
      setInit(true);
    })
  }, [])
  return (
    <>
      {init ? <AppRouter isLoggedIn={isLoggedIn} userObj={userObj} /> : "초기화 중..." }
      <footer>&copy;{new Date().getFullYear()}Nwitter</footer>
    </>
  )
}

export default App;
