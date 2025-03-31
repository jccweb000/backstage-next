'use client'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { Button, Form, Input, message } from 'antd'

export default function LoginPage() {
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const onFinish = async (values: { account: string; password: string }) => {
    setLoading(true)
    try {
      const response = await fetch('/api/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      })

      const result = await response.json()
      
      if (result.code === 200) {
        // 1. 存储Token
        localStorage.setItem('token', result.data.token)
        
        // 2. 跳转到主页
        message.success('登录成功')
        router.push('/home')
      } else {
        message.error(result.message)
      }
    } catch (error) {
      message.error('网络请求失败')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <Form onFinish={onFinish}>
        <Form.Item name="account" rules={[{ required: true }]}>
          <Input placeholder="请输入账号" />
        </Form.Item>
        
        <Form.Item name="password" rules={[{ required: true }]}>
          <Input.Password placeholder="请输入密码" />
        </Form.Item>
        
        <Button 
          type="primary" 
          htmlType="submit" 
          loading={loading}
          block
        >
          登录
        </Button>
      </Form>
    </div>
  )
}