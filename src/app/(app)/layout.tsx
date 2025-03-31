import Link from 'next/link'
import { Menu } from 'antd' // 或使用其他UI库

import { SideMenu } from '@/app/components/SideMenu'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      {/* 左侧菜单 */}
      <div style={{ width: 240, height: '100%' }}>
        <SideMenu />
      </div>
      {/* 右侧内容区 */}
      <div style={{ flex: 1, padding: 20 }}>
        {children}
      </div>
    </div>
  )
}