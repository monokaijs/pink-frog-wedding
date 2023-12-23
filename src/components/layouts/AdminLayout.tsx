import {ReactNode} from "react";
import {ConfigProvider} from "antd";

interface AdminLayoutProps {
  children: ReactNode;
}

export default function AdminLayout({children}: AdminLayoutProps) {
  return <ConfigProvider>

  </ConfigProvider>
}
