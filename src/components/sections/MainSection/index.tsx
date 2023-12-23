import styles from "./MainSection.module.scss";
import localFont from 'next/font/local';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faHeart} from "@fortawesome/free-solid-svg-icons";
import {Alegreya} from "next/font/google";
import LeafOrnament from "@app/assets/figures/leaf-ornament.png";
import Leaves from "@app/components/sections/MainSection/Leaves";
import MainFigure from "@app/assets/figures/wedding-main-01.png";

const TanPearlFont = localFont({
  src: '../../../assets/fonts/TAN-MIGNON.otf'
})
const TanMonCheriFont = localFont({
  src: '../../../assets/fonts/TAN-MON-CHERI.otf',
})

const alegreyaFont = Alegreya({subsets: ['latin']});

export default function MainSection() {
  return <div className={styles.mainSection}>
    <Leaves/>
    <img src={MainFigure.src} alt={'main'} className={styles.mobileFigure}/>
    <div className={styles.welcomeText} style={{
      fontFamily: alegreyaFont.style.fontFamily
    }}>
      <div className={styles.welcome}>
        Trân trọng kính mời
      </div>
      <div className={styles.guest}>
        Một Thằng Em Bất Kỳ
      </div>
    </div>
    <div className={styles.title} style={{fontFamily: alegreyaFont.style.fontFamily}}>
      Tới dự Lễ Thành Hôn
    </div>
    <div className={styles.names} style={{
      fontFamily: TanMonCheriFont.style.fontFamily
    }}>
      <div className={styles.groom}>
        Vũ Thành L<span className={TanPearlFont.className}>ộ</span>c
        <FontAwesomeIcon icon={faHeart} className={styles.connector}/>
      </div>
      <div className={styles.bride}>
        Tr<span className={TanPearlFont.className}>ầ</span>n M<span className={TanPearlFont.className}>ỹ</span> Hoa
      </div>
    </div>
    <div className={styles.shortStory} style={{fontFamily: alegreyaFont.style.fontFamily}}>
      Một câu chuyện được viết lên bằng âm nhạc, tình yêu và tuổi trẻ. Viết vài câu vào dây dài dài sao cho nó dài được
      khoảng 2 dòng là vừa đẹp...
    </div>

    <div className={styles.cta}>
      <a className={styles.button} style={{
        fontFamily: alegreyaFont.style.fontFamily
      }}>
        <span className={styles.text}>
          Lịch trình
        </span>
        <span className={styles.date}>
          Jan 4th, 2024
        </span>
      </a>
    </div>
  </div>
}
