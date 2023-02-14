import logo from "./logo.svg";
import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/nice-select2.css";
import "./App.css";
import "./Override.css";
import { Routes, Route } from "react-router-dom";
import DefaultLayout from "./components/layouts/DefaultLayout";
import DetailsLayout from "./components/layouts/DetailsLayout";

import Login from "./Pages/Login";
import { AuthProvider, RequireAuth } from "react-auth-kit";
import React, { createContext, Suspense, useState } from "react";
import { Toaster } from "react-hot-toast";
import "./App.css";
import VideoModal from "./components/videos/VideoModal";
import ForgotPassword from "./Pages/ForgotPassword";
import routes from "./routes";
import RecoverPassword from "./Pages/RecoverPassword";
import { PreloaderProvider } from "./hooks/usePreloader";

export const VideoContext = createContext();
export const VideoLayoutContext = createContext();

function App() {
    const [modal, setModal] = useState(false);

    const [videoDetails, setVideoDetails] = useState({});
    const toggle = (video) => {
        if (video) {
            setVideoDetails({ ...video });
        }
        setModal(!modal);
    };

    const [isListView, setIsListView] = useState(true);
    const handleListView = () => {
        setIsListView((curr) => {
            return !curr;
        });
    };

    return (
        <div className="App">
            <VideoContext.Provider
                value={{ videoDetails, setVideoDetails, toggle }}
            >
                <VideoLayoutContext.Provider
                    value={{ isListView, setIsListView, handleListView }}
                >
                    <PreloaderProvider>
                        <Toaster />
                        <Routes>
                            {routes.map((route, index) => {
                                return (
                                    <Route
                                        key={index}
                                        path={route.path ? route.path : "/"}
                                        element={
                                            <RequireAuth loginPath="/login">
                                                {route.layout === "default" ? (
                                                    <DefaultLayout>
                                                        <Suspense
                                                            fallback={
                                                                <div>
                                                                    Loading...
                                                                </div>
                                                            }
                                                        >
                                                            <route.component />
                                                        </Suspense>
                                                    </DefaultLayout>
                                                ) : (
                                                    <DetailsLayout>
                                                        <Suspense
                                                            fallback={
                                                                <div>
                                                                    Loading...
                                                                </div>
                                                            }
                                                        >
                                                            <route.component />
                                                        </Suspense>
                                                    </DetailsLayout>
                                                )}
                                            </RequireAuth>
                                        }
                                    />
                                );
                            })}
                            <Route path="/login" element={<Login />} />
                            <Route
                                path="/forgot-password"
                                element={<ForgotPassword />}
                            />
                            <Route
                                path="/recover-password"
                                element={<RecoverPassword />}
                            />
                        </Routes>
                        {modal && (
                            <VideoModal
                                show={modal}
                                toggle={toggle}
                                videoDetails={videoDetails}
                            />
                        )}
                        {/* {modal && <VideoDetailsModal toggle={toggle} videoDetails={videoDetails} />} */}
                    </PreloaderProvider>
                </VideoLayoutContext.Provider>
            </VideoContext.Provider>
        </div>
    );
}

export default App;
