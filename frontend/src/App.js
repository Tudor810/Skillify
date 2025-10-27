import React, { useState, useEffect, createContext } from "react";
import Header from "./components/header/Header";
import "./css/variables.css";
import { Route, Routes, useLocation } from "react-router-dom";
import { StyledEngineProvider } from "@mui/material";

import Home from "./components/home/Home";
import Footer from "./components/footer/Footer";
import GetStarted from "./components/sign in/GetStarted";
import LoginPage from "./components/sign in/LoginPage";
import SignUp from "./components/sign in/SignUp";
import Pricing from "./components/pricing/Pricing";
import Questions from "./components/pricing/Questions";
import Privacy from "./components/terms/Privacy";
import Terms from "./components/terms/Terms";
import NotFound from "./components/404page/NotFound";
import ResetPassword from "./components/sign in/ResetPassword";
import Unauthorized from "./components/404page/Unauthorized";
import BuySucces from "./components/pricing/BuySucces";
import ReviewPage from "./components/Review/ReviewPage";
import RefundPolicy from "./components/pricing/RefundPolicy";
import LearningPage from "./components/learning/learning main 2/LearningPage";
import AboutUs from "./components/AboutUs/AboutUs";
import ChatPage from './components/Chat/ChatPage';
import ProfilePage from './components/Profile/ProfilePage'

import httpClient from "./httpClient";


export const GetStartedContext = createContext();

function App() {
  const [isAuthentificated, setIsAuthentificated] = useState(false);
  const [width, setWidth] = useState(window.innerWidth);
  const [getStarted, setGetStarted] = useState(false);

  const toggleGetStarted = () => {
    setGetStarted((prevState) => !prevState);
  };

  const location = useLocation();

  useEffect(() => {
    const checkAuthentification = async () => {
      try {
        const resp = await httpClient.get(
          "https://api.skillify-ai.com/home/authentificated"
        );

        setIsAuthentificated(resp.data.token);
      } catch (err) {
        console.log(err);
        setIsAuthentificated(false);
      }
    };
    checkAuthentification();
  }, [location]);

    useEffect(() => {
      const handleResize = () => {
        setWidth(window.innerWidth);
      };

      window.addEventListener("resize", handleResize);

      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }, []);
 
    const googleTranslateElementInit = () => {
      new window.google.translate.TranslateElement({
        pageLanguage: 'auto',
        autoDisplay: false,
        layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE
    },
      'google_translate_element');
  };


  useEffect(() => {
    const addScriptFunction = () => {
            var addScript = document.createElement("script");
                addScript.setAttribute(
                "src",
                "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
                );
                addScript.id = "google-script"
            document.body.appendChild(addScript);
            window.googleTranslateElementInit = googleTranslateElementInit;
        
    }
        addScriptFunction()
        return () => {

          document.body.removeChild(document.getElementById("google-script"));
        }
  }, []);

  return (
    <>
      <div style={{width: "100%",
      display: "flex",
       flexDirection: "column",
        alignItems: "center"}}>
        <StyledEngineProvider injectFirst>
          <GetStartedContext.Provider value={{ getStarted, toggleGetStarted }}>
            <div
              className="App"
            >
              {location.pathname.split("/")[1] !== "chat" &&  
                location.pathname.split("/")[1] !== "learn" &&
                location.pathname.split("/")[1] !== "profile" &&
                location.pathname !== "/categories" &&
                location.pathname !== "/login" &&
                location.pathname !== "/sign-up" &&
                location.pathname.split("/")[1] !== "reset-password" &&
                location.pathname !== "/payment-succes" &&
                location.pathname !== "/saved" &&
                location.pathname !== "/learning-techniques" &&
                location.pathname !== "/dashboard" && (
                  <Header width={width} isAuthentificated={isAuthentificated} />
                )}

              <Routes>
                <Route path = "*" element={<NotFound />} />
                <Route
                  path="/"
                  element={
                    <Home width={width} isAuthentificated={isAuthentificated} />
                  }
                />
                <Route path="/login" element={<LoginPage width={width} />} />
                <Route path="/sign-up" element={<SignUp />} />
                <Route
                  path="/categories"
                  element={<LearningPage width={width} />}
                />
                <Route
                  path="/dashboard"
                  element={<LearningPage width={width} />}
                />
                <Route
                  path="/pricing"
                  element={<Pricing isAuthentificated={isAuthentificated} />}
                />
                <Route path="/faq" element={<Questions />} />
                <Route path="/terms-of-service" element={<Terms />} />
                <Route path="/privacy-policy" element={<Privacy />} />
                <Route path="/reset-password/:id" element={<ResetPassword />} />
                <Route path="/unauthorized" element={<Unauthorized />} />
                <Route path="/payment-succes" element={<BuySucces />} />
                <Route
                  path="/reviews"
                  element={
                    <ReviewPage
                      width={width}
                      isAuthentificated={isAuthentificated}
                    />
                  }
                />
                <Route path="/refund-policy" element={<RefundPolicy />} />
                <Route
                  path="/learn/:id"
                  element={<LearningPage width={width} />}
                />
                <Route path="/saved" element={<LearningPage width={width} />} />
                <Route path="/about-us" element={<AboutUs width = {width} />} />
                <Route
                  path="/learning-techniques"
                  element={<LearningPage width={width} />}
                />
                <Route path = "/chat" element = {<ChatPage width={width}/>} />
                <Route path = '/chat/:id' element = {<ChatPage width={width}/>} />
                <Route path= '/profile' element = {<ProfilePage width={width}/>} />
              </Routes>

              { location.pathname.split('/')[1] !== "chat" && 
                location.pathname.split("/")[1] !== "learn" &&
                location.pathname !== "/categories" &&
                location.pathname !== "/login" &&
                location.pathname !== "/sign-up" &&
                location.pathname.split("/")[1] !== "reset-password" &&
                location.pathname !== "/payment-succes" &&
                location.pathname !== "/saved" &&
                location.pathname !== "/learning-techniques" &&
                location.pathname !== "/dashboard" && 
                location.pathname !== "/reviews" && 
                location.pathname.split("/")[1] !== "profile" && (
                  <Footer />
                )}
              <GetStarted open={getStarted} handleClose={toggleGetStarted} />
            </div>
          </GetStartedContext.Provider>
        </StyledEngineProvider>
      </div>
    </>
  );
}

export default App;
