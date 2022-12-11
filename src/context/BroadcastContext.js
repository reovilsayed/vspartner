
import Echo from "laravel-echo";
import React, { createContext } from "react";

window.Pusher = require("pusher-js");

export const BroadcastContext = createContext();

const BroadcastContextProvider = ({ children }) => {
  const echo = new Echo({
    broadcaster: "pusher",
    key: process.env.REACT_APP_PUSHER_APP_KEY,
    cluster: process.env.REACT_APP_PUSHER_APP_CLUSTER,
    forceTLS: true,
  });

  return (
    <BroadcastContext.Provider value={{ Echo: echo }}>
      {children}
    </BroadcastContext.Provider>
  );
};

export default BroadcastContextProvider;
