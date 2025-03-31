import { NextResponse } from 'next/server';
import dbConnect from '../../../../../lib/dbConnect';
import User from '../../../../../models/users/model';

export async function POST(request: Request) {
  await dbConnect()

  try {
    const { account, password, name } = await request.json()

    // 1. 检查用户是否已存在
    const existingUser = await User.findOne({ account })
    if (existingUser) {
      return NextResponse.json(
        { code: 400, message: '账号已存在' },
        { status: 400 }
      )
    }

    // 3. 创建新用户
    const newUser = await User.create({
      account,
      password,
      name,
      role: ['user'] // 默认角色
    })

    // 4. 返回成功响应（不返回密码）
    return NextResponse.json({
      code: 201,
      data: {
        account: newUser.account,
        name: newUser.name,
        id: newUser.id
      }
    }, { status: 201 })

  } catch (error) {
    console.error('Registration error:', error)
    return NextResponse.json(
      { code: 500, message: '服务器内部错误' },
      { status: 500 }
    )
  }
}