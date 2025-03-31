'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu } from 'antd'

export function SideMenu() {
  const pathname = usePathname()
  
  const menuItems = [
    { key: '/home', label: <Link href="/home">Home</Link> },
    { key: '/about', label: <Link href="/about">About</Link> },
    { key: '/user', label: <Link href="/user">User</Link> },
    { key: '/shop', label: <Link href="/shop">Shop</Link> },
  ]

  return (
    <Menu items={menuItems} selectedKeys={[pathname]} style={{ height: '100%' }} />
  )
}