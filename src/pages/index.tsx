import MainFigure from "@app/assets/figures/wedding-main-01.png";
import WaterBackground from "@app/assets/background/water-color-01.png";
import Sider from "@app/components/Sider";
import styles from "@app/styles/Home.module.scss";
import MusicPlayer from "@app/components/MusicPlayer";
import MainSection from "@app/components/sections/MainSection";
import WeddingMain02 from "@app/assets/figures/wedding-main-02.png";
import StorySection from "@app/components/sections/StorySection";
import CalendarSection from "@app/components/sections/CalendarSection";
import GuestSection from "@app/components/sections/GuestSection";
import {useRouter} from "next/router";
import {useEffect, useState} from "react";
import {apiService} from "@app/services/api.service";
import {InvitationDto} from "@app/types/invitation.type";

export default function Home() {
  const {query} = useRouter();
  const [invitation, setInvitation] = useState<InvitationDto | null>(null);
  console.log({code: query?.code})

  useEffect(() => {
    if(query?.code){
      apiService.getInvitationByCode(query?.code as string).then((response) => {
        setInvitation(response?.data)
      })
    }
  }, [query?.code]);

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
        <MainSection invitation={invitation}/>
        <CalendarSection/>
        <StorySection/>
        <GuestSection invitation={invitation}/>
      </div>
      <div className={styles.figure}>
        <img
          className={styles.bgFigure}
          src={WeddingMain02.src}
          style={{
            height: '100vh',
            position: 'absolute',
            left: -200, right: 0, top: 0, bottom: 0,
            zIndex: 0,
            opacity: .24
          }}
        />
        <img
          src={MainFigure.src}
          className={styles.mainFigure}
        />
        <MusicPlayer/>
      </div>
    </div>
  )
}
