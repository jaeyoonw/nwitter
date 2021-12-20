import React, { useEffect, useState } from "react";
import AppRouter from "components/Router";
import { authService } from "myFirebase";

function App() {
  const [init, setInit] = useState(false);
  const [isLoggedIn, setIsLoggedIn ] = useState(false);
  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if (user) {             // user가 존재하면 ( 로그인 상태 true )
        setIsLoggedIn(true);
      } else {                // user가 존재하지 않으면 ( 로그인 상태 false )
        setIsLoggedIn(false);
      }
      setInit(true);
    })
  }, [])
  return (
    <>
      {init ? <AppRouter isLoggedIn={isLoggedIn} /> : "초기화 중..." }
      <footer>&copy;{new Date().getFullYear()}Nwitter</footer>
    </>
  )
}

export default App;
