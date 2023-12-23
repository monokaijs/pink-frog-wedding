import styles from "./GuestSection.module.scss";
import {Alegreya} from "next/font/google";
import {useState} from "react";

const alegreyaFont = Alegreya({subsets: ['latin']});
export default function GuestSection() {
  const [willJoin, setWillJoin] = useState(true);
  return <div className={styles.guestSection} style={{
    fontFamily: alegreyaFont.style.fontFamily
  }}>
    <div className={styles.content}>
      <div className={styles.title}>
        Thông tin tham gia
      </div>
      <div className={styles.description}>
        Bạn vui lòng điền giúp chúng mình những thông tin dưới đây nhé! Những thông tin này sẽ giúp chúng mình có thể
        đón tiếp bạn tốt hơn cũng như liên lạc với bạn khi cần thiết. Cảm ơn bạn rất nhiều!
      </div>
      <div className={styles.form}>
        <div className={styles.formItem}>
          <label htmlFor={'willJoin'}>
            Bạn có thể tham dự chứ?
          </label>
          <div className={styles.choice} onClick={() => setWillJoin(true)}>
            <input type={'radio'} radioGroup={'willJoin'} name={'willJoin'} checked={willJoin}/> Có tham dự
          </div>
          <div className={styles.choice} onClick={() => setWillJoin(false)}>
            <input type={'radio'} radioGroup={'willJoin'} name={'willJoin'} checked={!willJoin}/> Không tham dự
          </div>
        </div>
        <div className={styles.formItem}>
          <label htmlFor={'phoneNumber'}>
            Số điện thoại
          </label>
          <input className={styles.text} name={'phoneNumber'} placeholder={'0123456789'} style={{
            fontFamily: alegreyaFont.style.fontFamily
          }} disabled={!willJoin}/>
        </div>
        <div className={styles.formItem}>
          <label htmlFor={'participants'}>
            Số người tham dự
          </label>
          <select name={'participants'} style={{
            fontFamily: alegreyaFont.style.fontFamily
          }} disabled={!willJoin}>
            <option value={1}>1 người</option>
            <option value={2}>2 người</option>
            <option value={3}>3 người</option>
            <option value={4}>4 người</option>
            <option value={5}>5 người</option>
            <option value={6}>6 người</option>
          </select>
        </div>
        <div className={styles.formItem}>
          <button style={{
            fontFamily: alegreyaFont.style.fontFamily
          }}>
            Lưu thông tin
          </button>
        </div>
      </div>
    </div>
  </div>
}
