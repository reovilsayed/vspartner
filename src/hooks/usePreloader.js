import React, { createContext, useContext, useState } from "react";
export const PreloaderContext = createContext([]);

export const PreloaderProvider = ({ children }) => {
  const [showLoader, setShowLoader] = useState(true);
  return (
    <PreloaderContext.Provider value={[showLoader, setShowLoader]}>
      <div style={{ display: showLoader ? "none" : "block" }}>{children}</div>
      {showLoader}
    </PreloaderContext.Provider>
  );
};

const usePreloader = () => {
  const [showLoader, setShowLoader] = useContext(PreloaderContext);
  return [showLoader, setShowLoader];
};

export default usePreloader;
