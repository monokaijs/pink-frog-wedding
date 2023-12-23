import styles from "./StorySection.module.scss";
import {Alegreya} from "next/font/google";
import Leaf01 from "@app/assets/leaves/leaf-01.png";
import 'react-vertical-timeline-component/style.min.css';
import { VerticalTimeline, VerticalTimelineElement }  from 'react-vertical-timeline-component';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faHeart} from "@fortawesome/free-solid-svg-icons";

const alegreyaFont = Alegreya({subsets: ['latin']});
export default function StorySection() {
  return <div className={styles.storySection} style={{
    fontFamily: alegreyaFont.style.fontFamily
  }}>
    <div className={styles.content}>
      <div className={styles.title}>
        Câu Chuyện Lộc & Hoa
        <img src={Leaf01.src} className={styles.leaf}/>
      </div>
      <div className={styles.opening}>
        Đôi lời mở bài cho một cuộc tình dài...
      </div>
      <VerticalTimeline
        layout={'1-column-left'}
      >
        <VerticalTimelineElement
          position={'right'}
          className="vertical-timeline-element--work"
          date="Thứ 2, ngày nào đó, năm 2022"
          iconStyle={{backgroundColor: '#362222', color: 'white'}}
          icon={<FontAwesomeIcon icon={faHeart}/>}
        >
          <h3 className="vertical-timeline-element-title">Lần Đầu Gặp Gỡ</h3>
          <h4 className="vertical-timeline-element-subtitle">Miami, FL</h4>
          <p>
            Viết gì đó sến sẩm
          </p>
        </VerticalTimelineElement>
        <VerticalTimelineElement
          position={'right'}
          className="vertical-timeline-element--work"
          date="Thứ 2, ngày nào đó, năm 2022"
          iconStyle={{backgroundColor: '#362222', color: 'white'}}
          icon={<FontAwesomeIcon icon={faHeart}/>}
        >
          <h3 className="vertical-timeline-element-title">Lần Đầu Gặp Gỡ</h3>
          <h4 className="vertical-timeline-element-subtitle">Miami, FL</h4>
          <p>
            Viết gì đó sến sẩm
          </p>
        </VerticalTimelineElement>
        <VerticalTimelineElement
          position={'right'}
          className="vertical-timeline-element--work"
          date="Thứ 2, ngày nào đó, năm 2022"
          iconStyle={{backgroundColor: '#362222', color: 'white'}}
          icon={<FontAwesomeIcon icon={faHeart}/>}
        >
          <h3 className="vertical-timeline-element-title">Lần Đầu Gặp Gỡ</h3>
          <h4 className="vertical-timeline-element-subtitle">Miami, FL</h4>
          <p>
            Viết gì đó sến sẩm
          </p>
        </VerticalTimelineElement>
      </VerticalTimeline>
    </div>
  </div>
}