import styles from "./Sider.module.scss";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCalendar, faEnvelope, faHeart, faPencil} from "@fortawesome/free-solid-svg-icons";

export default function Sider() {
  return <div className={styles.sider}>
    <a className={styles.item}>
      <FontAwesomeIcon icon={faEnvelope}/>
    </a>
    <a className={styles.item}>
      <FontAwesomeIcon icon={faCalendar}/>
    </a>
    <a className={styles.item}>
      <FontAwesomeIcon icon={faHeart}/>
    </a>
    <a className={styles.item}>
      <FontAwesomeIcon icon={faPencil}/>
    </a>
  </div>
}
