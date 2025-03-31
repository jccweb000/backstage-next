'use client'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { Button, Form, Input, message } from 'antd'
import Link from 'next/link'

export default function RegisterPage() {
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const onFinish = async (values: {
    account: string
    password: string
    name: string
  }) => {
    setLoading(true)
    try {
      const response = await fetch('/api/users/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      })

      const result = await response.json()
      
      if (result.code === 201) {
        message.success('注册成功')
        router.push('/login') // 跳转到登录页
      } else {
        message.error(result.message)
      }
    } catch (error) {
      message.error('注册失败，请重试')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ maxWidth: 400, margin: '0 auto', padding: 24 }}>
      <h1 style={{ textAlign: 'center', marginBottom: 24 }}>用户注册</h1>
      
      <Form onFinish={onFinish} layout="vertical">
        <Form.Item
          name="account"
          label="账号"
          rules={[
            { required: true, message: '请输入账号' },
            { min: 4, message: '账号至少4个字符' }
          ]}
        >
          <Input placeholder="请输入账号" />
        </Form.Item>

        <Form.Item
          name="password"
          label="密码"
          rules={[
            { required: true, message: '请输入密码' },
            { min: 6, message: '密码至少6个字符' }
          ]}
        >
          <Input.Password placeholder="请输入密码" />
        </Form.Item>

        <Form.Item
          name="name"
          label="昵称"
          rules={[{ required: true, message: '请输入昵称' }]}
        >
          <Input placeholder="请输入昵称" />
        </Form.Item>

        <Form.Item>
          <Button 
            type="primary" 
            htmlType="submit" 
            loading={loading}
            block
          >
            注册
          </Button>
        </Form.Item>

        <div style={{ textAlign: 'center' }}>
          已有账号？<Link href="/login">立即登录</Link>
        </div>
      </Form>
    </div>
  )
}