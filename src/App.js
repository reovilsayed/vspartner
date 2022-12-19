import logo from "./logo.svg";
import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/nice-select2.css";
import "./App.css";
import "./Override.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import DefaultLayout from "./components/layouts/DefaultLayout";
import VideoDetailsModal from './components/videos/VideoDetailsModal';

import Home from "./routes/Home"
import MyEearning from "./routes/MyEearning";

import Notifications from "./routes/Notifications";
import Setting from "./routes/Setting";
import Login from "./routes/Login";
import { AuthProvider, RequireAuth } from "react-auth-kit";
import React, { createContext, Suspense, useState } from "react";
import { Toaster } from "react-hot-toast";
import "./App.css";
import Videos from "./Pages/Videos/Videos";
import Earnings from "./Pages/Earnings/Earnings";
import Messages from "./Pages/Messages/Messages";
import VideoModal from "./components/videos/VideoModal";
import ForgotPassword from "./routes/ForgotPassword";
import Chat from "./routes/Chat";


export const VideoContext = createContext();

function App() {
  const [modal, setModal] = useState(false);

  const [videoDetails, setVideoDetails] = useState({});
  const toggle = (video) => {
    if (video) {
      setVideoDetails({ ...video });
    }
    setModal(!modal);
  };
  return (
    <div className="App">
      <VideoContext.Provider value={{ videoDetails, setVideoDetails, toggle }}>
        <Routes>
          <Route
            path="/"
            element={
              <RequireAuth loginPath="/login">
                <DefaultLayout>
                  <Home />
                </DefaultLayout>
              </RequireAuth>
            }
          />
          <Route
            path="/my-videos"
            element={
              <RequireAuth loginPath="/login">
                <DefaultLayout>
                  <Videos />
                </DefaultLayout>
              </RequireAuth>
            }
          />
          <Route
            path="/my-earnings"
            element={
              <RequireAuth loginPath="/login">
                <DefaultLayout>
                  <MyEearning />
                </DefaultLayout>
              </RequireAuth>
            }
          />
          <Route
            path="/my-messages"
            element={
              <RequireAuth loginPath="/login">
                <DefaultLayout>
                  <Messages />
                </DefaultLayout>
              </RequireAuth>
            }
          />
          <Route
            path="/notification"
            element={
              <RequireAuth loginPath="/login">
                <DefaultLayout>
                  <Notifications />
                </DefaultLayout>
              </RequireAuth>
            }
          />
          <Route
            path="/setting"
            element={
              <RequireAuth loginPath="/login">
                <DefaultLayout>
                  <Setting />
                </DefaultLayout>
              </RequireAuth>
            }
          />
          <Route
            path="/chat-details/:id"
            element={
              <RequireAuth loginPath="/login">

                  <Chat/>
              </RequireAuth>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
        </Routes>
        {/* <VideoModal show={modal} toggle={toggle} videoDetails={videoDetails} /> */}
        {/* {modal && <VideoDetailsModal toggle={toggle} videoDetails={videoDetails} />} */}
      </VideoContext.Provider>
    </div>
  );
}

export default App;
