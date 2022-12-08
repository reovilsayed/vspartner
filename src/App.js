import logo from "./logo.svg";
// import './assets/bootstrap.min.css';
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

function App() {
  return (
    <div className="App">
      <AuthProvider
        authType={"cookie"}
        authName={"_partner_auth"}
        cookieDomain={window.location.hostname}
        cookieSecure={window.location.protocol === "https:"}
      >
        <BrowserRouter>
          <Routes>
            <Route
              path="/"
              element={
                <DefaultLayout>
                  <Home />
                </DefaultLayout>
              }
            />
            <Route
              path="/my-videos"
              element={
                <DefaultLayout>
                  <MyVideos />
                </DefaultLayout>
              }
            />
            <Route
              path="/my-earnings"
              element={
                <DefaultLayout>
                  <MyEearning />
                </DefaultLayout>
              }
            />
            <Route
              path="/my-messages"
              element={
                <DefaultLayout>
                  <MyMessages />
                </DefaultLayout>
              }
            />
            <Route
              path="/notification"
              element={
                <DefaultLayout>
                  <Notifications />
                </DefaultLayout>
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
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

export default App;
