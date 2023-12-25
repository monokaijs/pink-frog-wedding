import AdminLayout from "@app/components/layouts/AdminLayout";
import {Button, Card, Dropdown, notification, Table, Typography} from "antd";
import {useEffect, useState} from "react";
import {InvitationDto, Relationship} from "@app/types/invitation.type";
import {apiService} from "@app/services/api.service";
import {ColumnsType} from "antd/es/table";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEllipsis, faEye, faPlus} from "@fortawesome/free-solid-svg-icons";
import {InvitationModal} from "@app/components/admin/InvitationModal";
import {ResultModal} from "@app/components/admin/ResultModal";

export default function AdminPage() {
  const [invitation, setInvitation] = useState<InvitationDto | null>(null);
  const [invitations, setInvitations] = useState<InvitationDto[]>([]);
  const [isOpenInvitationModal, setIsOpenInvitationModal] = useState<boolean>(false);
  const [isOpenResultModal, setIsOpenResultModal] = useState<boolean>(false);
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
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
      render: (description) => {
        return <Typography.Paragraph className={'mb-0'} ellipsis={{
          rows: 2,
          expandable: true,
        }}>{
          description
        }</Typography.Paragraph>
      }
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
          {willJoin ? 'Sẽ tham gia' : 'Chưa có thông tin'}
        </Typography.Text>
      }
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, records) => {
        return <Dropdown menu={{
          items: [{
            label: 'Xem thông tin',
            key: 'view',
            onClick: () => {
              setInvitation(records);
              setIsOpenResultModal(true);
            }
          }, {
            label: 'Xóa',
            key: 'delete',
            danger: true,
            onClick: () => {
              // delete record
              console.log(records)
              apiService.deleteInvitation(records.code).then(() => {
                notification.success({
                  message: 'Deleted',
                  description: 'Deleted invitation successfully',
                });
                setInvitations(ivs => {
                  return ivs.filter(i => i._id !== records._id);
                })
              });
            }
          }]
        }}>
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
      <Button type={'primary'} icon={<FontAwesomeIcon icon={faPlus}/>} onClick={() => {
        setInvitation(null);
        setIsOpenInvitationModal(true);
      }}>
        Create
      </Button>
    </div>
    <Table dataSource={invitations} columns={columns}/>
    <InvitationModal
      setIsOpenResultModal={setIsOpenResultModal}
      setInvitation={setInvitation}
      invitation={invitation}
      onCancel={handleCancelInvitationModal}
      isOpen={isOpenInvitationModal}
      onLoad={handleLoadInvitations}
    />
    <ResultModal isOpen={isOpenResultModal} onCancel={handleCancelResultModal} invitation={invitation}/>
  </AdminLayout>
}

export const getServerSideProps = async () => {
  return {
    props: {},
  };
}
