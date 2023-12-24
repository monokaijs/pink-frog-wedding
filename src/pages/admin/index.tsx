import AdminLayout from "@app/components/layouts/AdminLayout";
import {Card, Table, Typography} from "antd";

export default function AdminPage() {
  return <AdminLayout>
    <Typography.Title>
      Invitations
    </Typography.Title>
    <Typography.Paragraph>
      Manage invitations with specific information...
    </Typography.Paragraph>
    <Table

    />
  </AdminLayout>
}

export const getServerSideProps = async () => {
  return {
    props: {},
  };
}
