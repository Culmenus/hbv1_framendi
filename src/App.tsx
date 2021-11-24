import { useState } from "react";
import Forum from "./pages/ForumsPage/Forums";
import Homepage from "./pages/HomePage/Homepage";
import Userpage from "./pages/Userpage/Userpage";
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

import MiniDrawer from "./components/NavBar/Drawer";
import { useGetLoggedInQuery } from "./app/services/backendConnection";
import { Box, ThemeProvider, CssBaseline } from "@mui/material";
import { darkTheme } from "./pages/PageMisc";
const tempUser: User = {
  id: 1,
  username: "Nati",
  password: "ermagerd",
  email: "nati@nati.is",
  favouriteForums: [],
  userRole: Role.User,
};

const App = () => {
  return (
    <Provider store={store}>
      {/*<Header/> */}
      <AppNavigationContainer>
        <Routes>
          <Route path="/" element={<Homepage forums={mockForums} />} />
          <Route path="/forums/:id" element={<Forum isDarkTheme={true} />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/myforums"
            element={<FavoriteForums forums={tempUser.favouriteForums || []} />}
          />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/forgotpassword" element={<Forgotpassword />} />
          <Route path="/user" element={<Userpage />} />
          <Route element={<NotFound />} />
        </Routes>
      </AppNavigationContainer>
      {/*<Footer/>*/}
    </Provider>
  );
};

type NavProps = {
  children: JSX.Element | JSX.Element[];
};
function AppNavigationContainer({ children }: NavProps) {
  useGetLoggedInQuery();
  const [isDarkMode, setDarkMode] = useState<boolean>(true);
  const NavigationBar = ({ href }: { href: string }) => {
    return <MiniDrawer href={href} setDarkMode={setDarkMode} />;
  };
  return (
    <div>
      <Box display="flex" flexDirection="row">
        <Box display="flex" flexDirection="row">
          <NavigationBar href={"Home"} />
        </Box>
        <Box
          display="flex"
          flexDirection="row"
          flexGrow={1}
          justifyContent="center"
        >
          {children}
        </Box>
      </Box>
    </div>
  );
}
export default App;
