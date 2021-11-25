import { useEffect, useState } from "react";
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
import FavoriteForums from "./pages/FavorteForumsPage/FavoriteForums";

import MiniDrawer from "./components/NavBar/Drawer";
import { useGetLoggedInQuery } from "./app/services/backendConnection";
import { Box, ThemeProvider, CssBaseline } from "@mui/material";
import { darkTheme } from "./pages/PageMisc";
import { ProtectedRoute } from "./utils/ProtectedRoute";


const NavigationBar = ({ href }: { href: string }) => {
  return <MiniDrawer href={href}/>;
};
const App = () => {
  return (
    <Provider store={store}>
      {/*<Header/> */}
      <AppNavigationContainer>
        <Routes>
          {/* Private routes */}
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Homepage NavBar={<NavigationBar href={"Home"} />}/>
              </ProtectedRoute>
            }
          />
          <Route
            path="/forums/:id"
            element={
              <ProtectedRoute>
                <Forum isDarkTheme={true} NavBar={NavigationBar} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/user"
            element={
              <ProtectedRoute>
                <Userpage NavBar={<NavigationBar href={"User Profile"} />}/>
              </ProtectedRoute>
            }
          />
          <Route
            path="/myforums"
            element={
              <ProtectedRoute>
                <FavoriteForums   NavBar={<NavigationBar href={"My Forums"} />} />
              </ProtectedRoute>
            }
          />

          {/* Public routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/forgotpassword" element={<Forgotpassword />} />

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
  const { data: user, isLoading } = useGetLoggedInQuery();

  const NavigationBar = ({ href }: { href: string }) => {
    return <MiniDrawer href={href} />;
  };
  return (
    <div>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <Box display="flex" flexDirection="row">
          
          <Box
            display="flex"
            flexDirection="row"
            flexGrow={1}
            justifyContent="center"
          >
            {children}
          </Box>
        </Box>
      </ThemeProvider>
    </div>
  );
}
export default App;
