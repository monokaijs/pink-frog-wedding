import styles from "./GuestSection.module.scss";
import {Alegreya} from "next/font/google";
import {useContext, useState} from "react";
import {InvitationDto, Relationship} from "@app/types/invitation.type";
import {message} from "antd";
import useRequest from "@app/hooks/useRequest";
import {apiService} from "@app/services/api.service";
import {GuestContext} from "@app/pages/[code]";

interface MainSectionProps {}

const alegreyaFont = Alegreya({subsets: ['latin']});

export default function GuestSection(props: MainSectionProps) {
  const {code} = useContext(GuestContext);
  const [willJoin, setWillJoin] = useState(true);
  const [participants, setParticipants] = useState("1");

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
      <form onSubmit={async (event: any) => {
        try {
          event.preventDefault();
          console.log('code', code);
          await apiService.updateInvitation(code!, {
            willJoin,
            participants
          })
          message.success('Lưu thông tin thành công!')
        } catch (error) {
          message.error('Có lỗi xảy ra khi lưu thông tin!')
        }
      }
      } className={styles.form}>
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
          <label htmlFor={'participants'}>
            Số người tham dự
          </label>
          <select name={'participants'} style={{
            fontFamily: alegreyaFont.style.fontFamily
          }} disabled={!willJoin} value={participants} onChange={(event) => {
            setParticipants(event.target.value)
          }}>
            <option value={"1"}>1 người</option>
            <option value={"2"}>2 người</option>
            <option value={"3"}>3 người</option>
            <option value={"4"}>4 người</option>
            <option value={"5"}>5 người</option>
            <option value={"6"}>6 người</option>
          </select>
        </div>
        <div className={styles.formItem}>
          <button style={{
            fontFamily: alegreyaFont.style.fontFamily
          }}
                  type={'submit'}
          >
            Lưu thông tin
          </button>
        </div>
      </form>
    </div>
  </div>
}
