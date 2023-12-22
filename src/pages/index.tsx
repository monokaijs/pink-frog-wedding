import MainFigure from "@app/assets/figures/wedding-main-01.png";
import WaterBackground from "@app/assets/background/water-color-01.png";
import Sider from "@app/components/Sider";
import styles from "@app/styles/Home.module.css";
import MusicPlayer from "@app/components/MusicPlayer";

export default function Home() {
  return (
    <div style={{
      backgroundImage: `url('${WaterBackground.src}')`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      width: '100%',
      height: '100%',
      position: 'relative'
    }} className={styles.home}>
      <Sider/>
      <div className={styles.content}>
        Content goes here
      </div>
      <div className={styles.figure}>
        <img
          src={MainFigure.src}
          className={styles.mainFigure}
        />
        <MusicPlayer/>
      </div>
    </div>
  )
}
