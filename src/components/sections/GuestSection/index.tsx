import styles from "./GuestSection.module.scss";
import {Alegreya} from "next/font/google";
import {useEffect, useState} from "react";
import {InvitationDto, Relationship} from "@app/types/invitation.type";
import {message} from "antd";
import {SubmitHandler, useForm} from "react-hook-form";
import useRequest from "@app/hooks/useRequest";
import {apiService} from "@app/services/api.service";



interface GuestFormPayload {
  willJoin: boolean,
  participants: string,
  guestName: string,
  relationship: Relationship,
  description?: string,
}

const alegreyaFont = Alegreya({subsets: ['latin']});
export default function GuestSection() {
  const {register, handleSubmit, watch, formState: {errors, isSubmitting}} = useForm<GuestFormPayload>();
  const [, doCreateInvitation] = useRequest(apiService.createInvitation);

  const onSubmitForm: SubmitHandler<GuestFormPayload> = async (payload: GuestFormPayload) => {
    try {
      payload.willJoin = (String(payload.willJoin) === "willJoin");
      payload.description = "Chưa có thông tin";
      await doCreateInvitation(payload);
      message.success('Gửi thông tin thành công!')
    } catch (error) {
      message.error('Có lỗi xảy ra khi gửi thông tin!')
    }
  }

  return <div className={styles.guestSection} style={{
    fontFamily: alegreyaFont.style.fontFamily
  }}>
    <div className={styles.content}>
      <div className={styles.title}>
        Thông tin tham gia
      </div>
      <div className={styles.description}>
        Quý khách mời vui lòng điền những thông tin dưới đây để gia đình chúng tôi có thể chuẩn bị đón tiếp chu đáo. Chân thành cảm ơn!
      </div>
      <form onSubmit={handleSubmit(onSubmitForm)} className={styles.form}>
        <div className={styles.formItem}>
          <label className={styles.bold}>
            Tên của bạn là?
          </label>
          <input {...register("guestName", {required: "Bạn vui lòng điền tên!"})} className={styles.text} style={{
            fontFamily: alegreyaFont.style.fontFamily
          }} placeholder={'Nguyễn Văn A'}/>
          <div className={styles['text-error']}>
            {errors?.guestName && errors?.guestName.message}
          </div>
        </div>
        <div className={styles.formItem}>
          <label className={styles.bold}>
            Bạn là khách mời của?
          </label>
          <div className={styles.choice}>
            <input {...register("relationship", {required: "Bạn vui lòng cho biết thông tin mối quan hệ!"})}
                   type={'radio'} radioGroup={'relationship'} value={"brideGuests"} id={"brideGuests"}/>
            <label htmlFor={"brideGuests"}>
              Cô dâu
            </label>
          </div>
          <div className={styles.choice}>
            <input {...register("relationship")} type={'radio'} radioGroup={'relationship'} value={"groomGuests"}
                   id={"groomGuests"}/>
            <label htmlFor={"groomGuests"}>
              Chú rể
            </label>
          </div>
          <div className={styles['text-error']}>
            {errors?.relationship && errors?.relationship.message}
          </div>
        </div>
        {/*<div className={styles.formItem}>*/}
        {/*  <label className={styles.bold}>*/}
        {/*    Mô tả về mối quan hệ của bạn?*/}
        {/*  </label>*/}
        {/*  <textarea {...register("description", {required: "Vui lòng mô tả qua về mối quan hệ của bạn!"})}*/}
        {/*            className={styles.text} style={{*/}
        {/*    fontFamily: alegreyaFont.style.fontFamily*/}
        {/*  }} placeholder={'Mối quan hệ...'}/>*/}
        {/*  <div className={styles['text-error']}>*/}
        {/*    {errors?.description && errors?.description.message}*/}
        {/*  </div>*/}
        {/*</div>*/}
        <div className={styles.formItem}>
          <label className={styles.bold}>
            Bạn có thể tham dự chứ?
          </label>
          <div className={styles.choice}>
            <input {...register("willJoin", {required: "Vui lòng cho biết quyết định tham dự của bạn!"})} type={'radio'}
                   radioGroup={'willJoin'} value={"willJoin"} id={"willJoin"}/>
            <label htmlFor={"willJoin"}>
              Có
              tham dự
            </label>
          </div>
          <div className={styles.choice}>
            <input {...register("willJoin")} type={'radio'} radioGroup={'willJoin'} value={"willNotJoin"}
                   id={"willNotJoin"}/>
            <label htmlFor={"willNotJoin"}>
              Không
              tham dự
            </label>
          </div>
          <div className={styles['text-error']}>
            {errors?.willJoin && errors?.willJoin.message}
          </div>
        </div>
        <div className={styles.formItem}>
          <label className={styles.bold} htmlFor={'participants'}>
            Số người tham dự
          </label>
          <select style={{
            fontFamily: alegreyaFont.style.fontFamily
          }} disabled={String(watch("willJoin")) === "willNotJoin"} {...register("participants")}>
            <option value={"1"}>1 người</option>
            <option value={"2"}>2 người</option>
            <option value={"3"}>3 người</option>
            <option value={"4"}>4 người</option>
            <option value={"5"}>5 người</option>
            <option value={"6"}>6 người</option>
          </select>
        </div>
        <div className={styles.formItem}>
          <button
            disabled={isSubmitting}
            style={{
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
