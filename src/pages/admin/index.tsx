import AdminLayout from "@app/components/layouts/AdminLayout";
import {Button, Card, Dropdown, message, Modal, Table, Typography} from "antd";
import {useEffect, useState} from "react";
import {InvitationDto, Relationship} from "@app/types/invitation.type";
import {apiService} from "@app/services/api.service";
import {ColumnsType} from "antd/es/table";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEllipsis, faPlus, faTrash} from "@fortawesome/free-solid-svg-icons";
import {InvitationModal} from "@app/components/admin/InvitationModal";
import {ResultModal} from "@app/components/admin/ResultModal";
import {faEye, faPenToSquare} from "@fortawesome/free-regular-svg-icons";
import useRequest from "@app/hooks/useRequest";

export default function AdminPage() {
  const [invitation, setInvitation] = useState<InvitationDto | null>(null);
  const [invitations, setInvitations] = useState<InvitationDto[]>([]);
  const [isOpenInvitationModal, setIsOpenInvitationModal] = useState<boolean>(false);
  const [isOpenResultModal, setIsOpenResultModal] = useState<boolean>(false);
  const [{status: removeStatus}, doRemoveInvitation] = useRequest(apiService.removeInvitation);
  useEffect(() => {
    handleLoadInvitations()
  }, []);

  const columns: ColumnsType<InvitationDto> = [
    {
      title: 'Guest name',
      dataIndex: 'guestName',
      key: 'guestName'
    },
    {
      title: 'Relationship',
      dataIndex: 'relationship',
      key: 'relationship',
      render: (relationship) => {
        return <Typography.Text>
          {relationship === Relationship.BRIDE_GUESTS ? 'Khách mời cô dâu' : 'Khách mời chú rể'}
        </Typography.Text>
      }
    },
    {
      title: 'Participants',
      dataIndex: 'participants',
      key: 'participants',
      render: (participants) => {
        return <Typography.Text>
          {participants ? participants : 'Chưa có thông tin'}
        </Typography.Text>
      }
    },
    {
      title: 'Will join',
      dataIndex: 'willJoin',
      key: 'willJoin',
      render: (willJoin) => {
        return <Typography.Text>
          {typeof willJoin === "undefined" ? "Chưa có thông tin" : (willJoin ? 'Sẽ tham gia' : 'Không tham gia')}
        </Typography.Text>
      }
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, records) => {
        return <Dropdown menu={{ items: [
            {
              label: 'Cập nhật',
              key: 'update',
              icon: <FontAwesomeIcon icon={faPenToSquare} />,
              onClick: () => {
                setInvitation(records);
                setIsOpenInvitationModal(true);
              }
            },
            {
              type: 'divider'
            },
            {
              danger: true,
              label: 'Xóa',
              key: 'remove',
              icon: <FontAwesomeIcon icon={faTrash} />,
              onClick: async () => {
                Modal.confirm({
                  title: `Bạn chắc chắn muốn xóa thư mời này chứ?`,
                  centered: true,
                  okText: 'Xóa',
                  cancelText: 'Hủy',

                  onOk: async () => {
                    try {
                      await doRemoveInvitation(records?._id);
                      handleLoadInvitations();
                      message.success('Xóa thư mời thành công!');
                    } catch (error) {
                      message.error('Xóa thư mời thất bại!');
                    }
                  }
                });
              }
            }
          ] }}>
          <Button shape={'circle'} type={'text'}>
            <FontAwesomeIcon icon={faEllipsis}/>
          </Button>
        </Dropdown>
      }
    }
  ]

  const handleLoadInvitations = () => {
    apiService.getAllInvitations().then((response) => {
      setInvitations(response?.data)
    });
  }

  const handleCancelInvitationModal = () => {
    setIsOpenInvitationModal(false);
  }

  const handleCancelResultModal = () => {
    setIsOpenResultModal(false);
  }

  return <AdminLayout>
    <div className={'flex justify-between items-center'}>
      <div>
        <Typography.Title className={'mb-2'}>
          Invitations
        </Typography.Title>
        <Typography.Paragraph>
          Manage invitations with specific information...
        </Typography.Paragraph>
      </div>
    </div>
    <Table pagination={{pageSize: 8}} dataSource={invitations} columns={columns}/>
    <InvitationModal setIsOpenResultModal={setIsOpenResultModal} setInvitation={setInvitation} invitation={invitation} onCancel={handleCancelInvitationModal} isOpen={isOpenInvitationModal}
                     onLoad={handleLoadInvitations}/>
    {/*<ResultModal isOpen={isOpenResultModal} onCancel={handleCancelResultModal} invitation={invitation}/>*/}
  </AdminLayout>
}

export const getServerSideProps = async () => {
  return {
    props: {},
  };
}
