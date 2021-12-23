import React, { useState } from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import Home from "../routes/Home";
import Auth from '../routes/Auth';
import Navigation from './Navigation';
import Profile from 'routes/Profile';

// ({isLoggedIn}) 은 props내부를 파고들어간 구조분해, props.isLoggedIn을 의미함. 
// isLoggedIn, userObj 라는 2개의 props를 AppRouter가 전달받음. 
const AppRouter = ({isLoggedIn, userObj}) => {   
  return (
    <HashRouter>
      {isLoggedIn && <Navigation /> }   {/* 로그인이 되어있으면 */}
      <Routes>
        {isLoggedIn ? (
          <>
          <Route exact path="/" element={<Home userObj={userObj} />} />    {/* 로그인이 되어있으면 */}
          <Route exact path="/profile" element={<Profile />} />
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