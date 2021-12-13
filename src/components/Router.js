import React, { useState } from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import Home from "../routes/Home";
import Auth from '../routes/Auth';

const AppRouter = ({isLoggedIn}) => {   // ({isLoggedIn}) 은 props내부를 파고들어간 구조분해, props.isLoggedIn을 의미함.
  return (
    <HashRouter>
      <Routes>
        {isLoggedIn ? (
          <>
          <Route exact path="/" element={<Home />} />    {/* 로그인이 되어있으면 */}
          </> 
          ) : (
          <Route exact path="/" element={<Auth />} />    /* 로그인이 안되어 있으면 */
          )
        }
      </Routes>
    </HashRouter>
  )
}
export default AppRouter;