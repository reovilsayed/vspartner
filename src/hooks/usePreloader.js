import React, { createContext, useContext, useState } from "react";
import Preloader from "../components/layouts/Preloader";
export const PreloaderContext = createContext([]);

export const PreloaderProvider = ({ children }) => {
  const [showLoader, setShowLoader] = useState(false);
  return (
    <PreloaderContext.Provider value={[showLoader, setShowLoader]}>
      <div style={{ display: showLoader ? "none" : "block" }}>{children}</div>
      {showLoader && <Preloader />}
    </PreloaderContext.Provider>
  );
};

const usePreloader = () => {
  const [showLoader, setShowLoader] = useContext(PreloaderContext);
  return [showLoader, setShowLoader];
};

export default usePreloader;
