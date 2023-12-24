import {ReactNode} from "react";
import {ConfigProvider, Layout, Menu} from "antd";
import styles from "./AdminLayout.module.scss";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faGear, faUser} from "@fortawesome/free-solid-svg-icons";

interface AdminLayoutProps {
  children: ReactNode;
}

export default function AdminLayout({children}: AdminLayoutProps) {
  return <ConfigProvider>
    <Layout className={styles.adminLayout}>
      <Layout.Sider
        style={{
          backgroundColor: 'white'
        }}
      >
        <Menu
          items={[{
            key: 'invitations',
            label: 'Khách mời',
            icon: <FontAwesomeIcon icon={faUser}/>,
          }, {
            key: 'config',
            label: 'Thiết lập',
            icon: <FontAwesomeIcon icon={faGear}/>,
          }]}
        />
      </Layout.Sider>
      <Layout.Content className={styles.content}>
        <div className={styles.contentWrapper}>
          {children}
        </div>
      </Layout.Content>
    </Layout>
  </ConfigProvider>
}
