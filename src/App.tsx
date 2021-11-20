import React from "react";
import Forum from "./components/forum/Forum";
import Homepage from "./pages/HomePage/Homepage";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import NotFound from "./components/notfound/NotFound";
import { Route, Routes } from "react-router-dom";
import Login from "./pages/LoginPage/Login";
import "./App.css";
import SignUp from "./pages/SignupPage/Signup";
import Forgotpassword from "./pages/ForgotPasswordPage/Forgotpassword";
import { Provider } from "react-redux";
import { store } from "./app/store";

const App: React.FC = () => {
  return (
    <Provider store={store}>
      {/*<Header/> */}
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/forum/:id" element={<Forum />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/forgotpassword" element={<Forgotpassword />} />
        <Route element={<NotFound />} />
      </Routes>
      {/*<Footer/>*/}
    </Provider>
  );
};

export default App;
