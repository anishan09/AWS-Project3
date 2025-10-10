import React from "react";
import { BrowserRouter, Route, Routes,useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Footer from "./components/Footer";
import AboutUs from "./components/About";
import LoginPage from "./components/Login";
import RegisterPage from "./components/Register";
import ForgotPassword from "./components/ForgotPass.jsx";
import BookAppointment from "./components/BookAppointment.jsx";
import AdminPage from "./components/Adminpage.jsx";
import UploadDocument from "./components/Upload.jsx";
import MyAppointmentPage from "./components/Myappointment.jsx";
import MedicalNews from "./components/MedicalNews.jsx";
import NewsDetail from "./components/MedicalNews.jsx";
const Root = () => {
  const location = useLocation();
  const hideNavbarAndFooter = location.pathname === '/admin';

  return (
    <>
      {!hideNavbarAndFooter && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/bookapt" element={<BookAppointment />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/upload" element={<UploadDocument />} />
        <Route path="/myapt" element={<MyAppointmentPage />} />
      </Routes>
      {!hideNavbarAndFooter && <Footer />}
    </>
  );
};

const App = () => (
  <BrowserRouter>
    <Root />
  </BrowserRouter>
);

export default App;
