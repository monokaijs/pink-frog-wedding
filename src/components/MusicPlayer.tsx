import styles from "./MusicPlayer.module.scss";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faLink, faPause, faPlay, faRepeat} from "@fortawesome/free-solid-svg-icons";
import {Alegreya} from "next/font/google";
import {useEffect, useRef, useState} from "react";
import {formatMusicTime} from "@app/utils";

const alegreyaFont = Alegreya({subsets: ['latin']});

export default function MusicPlayer() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [paused, setPaused] = useState(true);
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.addEventListener('timeupdate', e => {
        setCurrentTime(audioRef.current?.currentTime || 0);
      });
      audioRef.current.addEventListener('pause', e => {
        setPaused(!!audioRef.current?.paused);
      });
      audioRef.current.addEventListener('play', e => {
        setPaused(!!audioRef.current?.paused);
        setDuration(audioRef.current?.duration || 0);
      })
    }
  }, [audioRef.current]);

  useEffect(() => {
    document.body.addEventListener("mouseup", function () {
      if (audioRef.current && !initialized) {
        setInitialized(true);
        return audioRef.current.play();
      }
    });
  }, []);

  return <div className={styles.musicPlayer} style={{
    fontFamily: alegreyaFont.style.fontFamily
  }}>
    <audio
      autoPlay={true}
      ref={audioRef}
      onLoadStart={e => {
        console.log(e.target);
      }}
      src={'/assets/music/TangNhau.mp3'}
    />
    <div className={styles.track}>
      TẶNG NHAU - Pink Frog
    </div>
    <div className={styles.timer}>
      <div className={styles.currentTime}>
        {!audioRef.current?.currentTime ? '--:--' : formatMusicTime(currentTime!)}
      </div>
      <input
        type="range" min="1" max="100" className={styles.slider} id="myRange"
        value={duration > 0 ? currentTime / duration * 100 : 0}
      />
      <div className={styles.duration}>
        {duration <= 0 ? '--:--' : formatMusicTime(duration)}
      </div>
    </div>
    <div className={styles.controls}>
      <a className={styles.smallBtn}>
        <FontAwesomeIcon icon={faRepeat}/>
      </a>
      <a className={styles.bigBtn} onClick={e => {
        console.log('clicked');
        e.preventDefault();
        if (paused) {
          audioRef.current?.play();
        } else audioRef.current?.pause();
      }}>
        <FontAwesomeIcon icon={paused ? faPlay : faPause}/>
      </a>
      <a className={styles.smallBtn}>
        <FontAwesomeIcon icon={faLink}/>
      </a>
    </div>
  </div>
}
