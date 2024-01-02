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
        setInitialized(true);
        setPaused(!!audioRef.current?.paused);
        setDuration(audioRef.current?.duration || 0);
      })
    }
  }, [audioRef.current]);

  useEffect(() => {
    document.body.addEventListener("mouseup", function () {
      if (audioRef.current && !(audioRef.current as any).initialized) {
        (audioRef.current as any).initialized = true;
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
      src={'/assets/music/TangNhau.mp3'}
    />
    <div className={styles.mobileProgress}>
      <div
        className={styles.progress}
        style={{
          width: `${duration > 0 ? currentTime / duration * 100 : 0}%`
        }}
      />
    </div>
    <div
      className={styles.mobileArtwork}
      style={{
        backgroundImage: `url('https://img.youtube.com/vi/XTsmH9b2ADY/0.jpg')`
      }}
    />
    <div className={styles.track}>
      Tặng nhau - Pink Frog x Flower
      <div className={styles.mobileTimer}>
        {!audioRef.current?.currentTime ? '--:--' : formatMusicTime(currentTime!)}
        {' / '}
        {duration <= 0 ? '--:--' : formatMusicTime(duration)}
      </div>
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
    <div className={styles.mobileControls}>
      <div className={styles.control}>
        <a href={'https://www.youtube.com/watch?v=XTsmH9b2ADY'} target={'_blank'}>
          <FontAwesomeIcon icon={faLink}/>
        </a>
      </div>
      <div className={styles.control}>
        <a onClick={e => {
          e.preventDefault();
          if (paused) {
            audioRef.current?.play();
          } else audioRef.current?.pause();
        }}>
          <FontAwesomeIcon icon={paused ? faPlay : faPause}/>
        </a>
      </div>
    </div>
    <div className={styles.controls}>
      <a className={styles.smallBtn}>
        <FontAwesomeIcon icon={faRepeat}/>
      </a>
      <a className={styles.bigBtn} onClick={e => {
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
