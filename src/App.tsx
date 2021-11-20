import React from "react";
import Forum from "./components/forum/Forum";
import Homepage from "./pages/HomePage/Homepage";
//import Header from "./components/header/Header";
//import Footer from "./components/footer/Footer";
import NotFound from "./components/notfound/NotFound";
import { Route, Routes } from "react-router-dom";
import Login from "./pages/LoginPage/Login";
import "./App.css";
import SignUp from "./pages/SignupPage/Signup";
import Forgotpassword from "./pages/ForgotPasswordPage/Forgotpassword";

const App: React.FC = () => {
  return (
    <>
      {/*<Header/> */}
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/forums/:id" element={<Forum />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/forgotpassword" element={<Forgotpassword />} />
        <Route element={<NotFound />} />
      </Routes>
      {/*<Footer/>*/}
    </>
  );
};

export default App;
