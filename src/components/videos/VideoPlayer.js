import { useEffect, useRef, useState } from 'react';
import videojs from 'video.js';
import 'video.js/dist/video-js.css';
import hlsQualitySelector from 'videojs-hls-quality-selector';
import qualityLevels from 'videojs-contrib-quality-levels';
import '@videojs/themes/dist/forest/index.css';
function VideoPlayer(props) {
  const { src, poster } = props;
  const videoRef = useRef();
  const [player, setPlayer] = useState(undefined);
  const [callFinishVideoAPI, setCallFinishVideoAPI] = useState(false);
  const [vidDuration, setVidDuration] = useState(50000);
  const videoId = 'e2280eeb-4cdb-43e7-a34f-36868326b8cb';
  useEffect(() => {
    if (player) {
      player.src({
        src: src,
        type: 'application/x-mpegURL',
        withCredentials: false,
      });
      player.poster();
      setCallFinishVideoAPI(false);
      setVidDuration(50000);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [videoId, src, poster]);

  useEffect(() => {
    if (callFinishVideoAPI) {
      // finishesVideo()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [callFinishVideoAPI]);

  useEffect(() => {
    const videoJsOptions = {
      autoplay: false,
      preload: 'auto',
      controls: true,
      //poster: poster,
      sources: [
        {
          src: src,
          type: 'application/x-mpegURL',
          withCredentials: false,
        },
      ],
      html5: {
        nativeAudioTracks: true,
        nativeVideoTracks: true,
        nativeTextTracks: true,
      },
    };

    const p = videojs(
      videoRef.current,
      videoJsOptions,
      function onPlayerReady() {
        // console.log('onPlayerReady');
      }
    );

    setPlayer(p);

    return () => {
      if (player) player.dispose();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (player) {
      player.hlsQualitySelector({ displayCurrentQuality: true });
    }
  }, [player]);
  return (
    <video
      ref={videoRef}
      onLoadedMetadata={(e, px) => {
        // console.log(e.target.duration);
        setVidDuration(e.target.duration);
      }}
      onTimeUpdate={(e) => {
        if (e.target.currentTime >= vidDuration - 10) {
          setCallFinishVideoAPI(true);
        }
      }}
      className="video-js vjs-theme-forest vjs-big-play-centered"
     
    ></video>
  );
}

export default VideoPlayer;