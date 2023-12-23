import styles from "./MusicPlayer.module.scss";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faLink, faPlay, faRepeat} from "@fortawesome/free-solid-svg-icons";
import {Alegreya} from "next/font/google";

const alegreyaFont = Alegreya({subsets: ['latin']});

export default function MusicPlayer() {
  return <div className={styles.musicPlayer} style={{
    fontFamily: alegreyaFont.style.fontFamily
  }}>
    <div className={styles.track}>
      TẶNG NHAU - Pink Frog
    </div>
    <div className={styles.timer}>
      <div className={styles.currentTime}>00:00</div>
      <input type="range" min="1" max="100" className={styles.slider} id="myRange"/>
      <div className={styles.duration}>04:50</div>
    </div>
    <div className={styles.controls}>
      <a className={styles.smallBtn}>
        <FontAwesomeIcon icon={faRepeat}/>
      </a>
      <a className={styles.bigBtn}>
        <FontAwesomeIcon icon={faPlay}/>
      </a>
      <a className={styles.smallBtn}>
        <FontAwesomeIcon icon={faLink}/>
      </a>
    </div>
  </div>
}
