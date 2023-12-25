import {Form, Input, message, Modal, QRCode} from "antd";
import {InvitationDto} from "@app/types/invitation.type";
import {useRouter} from "next/router";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCopy} from "@fortawesome/free-solid-svg-icons";

interface ResultModalProps {
  isOpen: boolean;
  onCancel: () => void;
  invitation: InvitationDto | null;
}

export const ResultModal = (props: ResultModalProps) => {
  const {isOpen, onCancel, invitation} = props;


  return <Modal
    title={'Thông tin về khách mời'}
    open={isOpen}
    onCancel={onCancel}
    footer={null}
    cancelText={'Cancel'}
  >
    <Form layout={'vertical'}>
      <Form.Item label={'Quét QR code để đến trang thư mời:'}>
        <QRCode value={`${typeof window !== 'undefined' ? window?.location?.origin : ''}/${invitation?.code}`}/>
      </Form.Item>
      <Form.Item label={'Đường dẫn thư mời:'}>
        <Input
          className={'cursor-pointer'}
          addonAfter={<FontAwesomeIcon icon={faCopy} onClick={() => {
            navigator.clipboard.writeText(`${typeof window !== 'undefined' ? window?.location?.origin : ''}/${invitation?.code}`).then(() => {
              message.success('Sao chép thành công!')
            })
          }}/>}
          value={`${typeof window !== 'undefined' ? window?.location?.origin : ''}/${invitation?.code}`}
        />
      </Form.Item>
    </Form>
  </Modal>
}
