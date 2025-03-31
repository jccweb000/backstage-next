import { NextResponse } from "next/server";
import bcrypt from 'bcryptjs';

import dbConnect from "../../../../../lib/dbConnect";
import User from "../../../../../models/users/model";

export async function POST (request: Request) {
  try {
    await dbConnect();
    const { account, password } = await request.json();

    // 1. 查找用户
    const user = await User.findOne({ account }).select('+password');
    
    if (!user) {
      return NextResponse.json(
        { code: 404, message: '用户不存在' },
        { status: 404 }
      )
    }

    // 2. 验证密码
    const isMatch = await bcrypt.compare(password, user.password);
    
    if (!isMatch) {
      return NextResponse.json(
        { code: 401, message: '密码错误' },
        { status: 401 }
      )
    }

    // 3. 生成Token
    const jwt = require('jsonwebtoken')
    const token = jwt.sign(
      { userId: user.id },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    )

    // 4. 返回成功响应
    return NextResponse.json({
      code: 200,
      data: {
        token,
        userInfo: {
          account: user.account,
          name: user.name
        }
      }
    })

    
  } catch (error) {
    console.error("Database error:", error);
    return NextResponse.json(
      { code: 500, message: '服务器错误' },
      { status: 500 }
    )
  }
}
