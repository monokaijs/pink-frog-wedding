import {InvitationDto, Relationship} from "@app/types/invitation.type";
import {Form, Input, message, Modal, Select} from "antd";
import {apiService} from "@app/services/api.service";
import {makeId} from "@app/utils";
import useRequest, {Status} from "@app/hooks/useRequest";
import {Dispatch, SetStateAction, useEffect} from "react";

interface InvitationModalProps {
  isOpen: boolean;
  onCancel: () => void;
  invitation: InvitationDto | null;
  onLoad: () => void,
  setInvitation: Dispatch<SetStateAction<InvitationDto | null>>;
  setIsOpenResultModal: any;
}

export const InvitationModal = (props: InvitationModalProps) => {
  const {isOpen, onCancel, invitation, onLoad, setInvitation, setIsOpenResultModal} = props;
  const [form] = Form.useForm();
  const [{status: createStatus}, doCreateInvitation] = useRequest(apiService.createInvitation);
  // const [{status: updateStatus}, doUpdateInvitation] = useRequest(apiService.)
  const handleSubmitForm = async (payload: Partial<InvitationDto>) => {
    try {
      const code = makeId(3);
      if (invitation?._id) {
        // await do
      } else {
        const response = await doCreateInvitation({
          ...payload,
          code
        });
        onLoad();
        setInvitation(response?.data);
        setIsOpenResultModal(true);
        message.success('Create invitation successfully!')
      }
    } catch (error) {
      message.error('Something wrongs')
    } finally {
      onCancel()
    }
  }

  useEffect(() => {
    if (!invitation?._id) {
      setInvitation( null);
      form.setFieldValue("relationship", Relationship.BRIDE_GUESTS);
    }
  }, []);

  return <div>
    <Modal
      title={invitation?._id ? 'Cập nhật lời mời' : 'Tạo lời mời'}
      open={isOpen}
      onOk={form.submit}
      confirmLoading={createStatus === Status.PENDING}
      onCancel={onCancel}
      okText={invitation?._id ? 'Cập nhật lời mời' : 'Tạo lời mời'}
      cancelText={'Hủy'}
    >
      <Form
        form={form}
        layout={'vertical'}
        onFinish={handleSubmitForm}>
        <div className={'flex gap-6'}>
          <Form.Item className={'flex-grow-1'} label="Tên khách mời" name={'guestName'} rules={[{required: true}]}>
            <Input placeholder="Tên khách mời..."/>
          </Form.Item>
          <Form.Item className={'flex-grow-1'} label="Relationship" name={'relationship'} rules={[{required: true}]}>
            <Select
              defaultValue={Relationship.BRIDE_GUESTS}
              options={[
                {value: Relationship.BRIDE_GUESTS, label: 'Khách mời cô dâu'},
                {value: Relationship.GROOM_GUESTS, label: 'Khách mời chú rể'}
              ]}
            />
          </Form.Item>
        </div>
        <Form.Item label="Thông tin về mối quan hệ" name={'description'} rules={[{required: true}]}>
          <Input.TextArea placeholder="Bổ sung thông tin về mối quan hệ..." rows={3}/>
        </Form.Item>
      </Form>
    </Modal>

  </div>
}
