import React from "react";
import Forum from "./components/forum/Forum";
import Homepage from "./pages/Homepage/Homepage";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import NotFound from "./components/notfound/NotFound";
import { Route, Routes } from "react-router-dom";

import "./App.css";

const App: React.FC = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/forum/:id" element={<Forum />} />
        <Route path="/asdf" element={<Forum />} />
        <Route element={<NotFound />} />
      </Routes>
      <Footer />
    </>
  );
};

export default App;
