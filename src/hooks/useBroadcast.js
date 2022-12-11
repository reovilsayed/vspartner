import { useContext, useEffect } from "react";
import { BroadcastContext } from '../context/BroadcastContext';

const useBroadcast = (channel, callback, event = []) => {
  const { Echo } = useContext(BroadcastContext);

  const defaultEvent = [".VideoDeleted", ".VideoCreated", ".VideoUpdated"];

  if (event.length === 0) event = [...defaultEvent];

  useEffect(() => {
    const echo = Echo.channel(channel);

    for (let i = 0; i < event.length; i++) {
      echo.listen(event[i], e => {
        callback(e);
      });
    }

    return () => Echo.leave(channel);
  }, [Echo, callback, event, channel]);
};

export default useBroadcast;
