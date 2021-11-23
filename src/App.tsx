import React, { useState } from "react";
import Forum from "./pages/ForumsPage/Forums";
import Homepage from "./pages/HomePage/Homepage";
//import Header from "./components/header/Header";
//import Footer from "./components/footer/Footer";
import NotFound from "./components/notfound/NotFound";
import { Route, Routes } from "react-router-dom";
import Login from "./pages/LoginPage/Login";
import "./App.css";
import SignUp from "./pages/SignupPage/Signup";
import Forgotpassword from "./pages/ForgotPasswordPage/Forgotpassword";
import { Provider } from "react-redux";
import { store } from "./app/store";
import { User } from "./types/User";
import { Role } from "./types/Role";
import { mockForums } from "./pages/HomePage/fakecontent";
import FavoriteForums from "./pages/FavorteForumsPage/FavoriteForums";

const tempUser: User = {
  id: 1,
  username: 'Nati',
  password: 'ermagerd',
  email: 'nati@nati.is',
  favouriteForums: [],
  userRole: Role.User,
}

const App= () => {
  const [isDarkMode, setDarkMode] = useState<boolean>(true);

  return (
    <Provider store={store}>
      {/*<Header/> */}
      <Routes>
        <Route path="/" element={<Homepage forums={mockForums} />} />
        <Route path="/forums/:id" element={<Forum isDarkTheme={true} user={tempUser}/>} />
        <Route path="/login" element={<Login />} />
        <Route path = "/myforums" element={<FavoriteForums forums={tempUser.favouriteForums} />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/forgotpassword" element={<Forgotpassword />} />
        <Route element={<NotFound />} />
      </Routes>
      {/*<Footer/>*/}
    </Provider>
  );
};

export default App;
