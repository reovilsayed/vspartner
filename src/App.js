import logo from "./logo.svg";
import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/nice-select2.css";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import DefaultLayout from "./components/layouts/DefaultLayout";
import Home from "./routes/Home";
import MyVideos from "./routes/MyVideos";
import MyEearning from "./routes/MyEearning";
import MyMessages from "./routes/MyMessages";
import Notifications from "./routes/Notifications";
import Setting from "./routes/Setting";
import Login from "./routes/Login";
import { AuthProvider, RequireAuth } from "react-auth-kit";
import React, { createContext, Suspense, useState } from "react";
import { Toaster } from "react-hot-toast";
import "./App.css";

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
                  <MyVideos />
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
                  <MyMessages />
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
          <Route path="/login" element={<Login />} />
        </Routes>
      </VideoContext.Provider>
    </div>
  );
}

export default App;
