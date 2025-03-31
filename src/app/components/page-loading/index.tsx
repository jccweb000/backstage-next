// components/PageLoading.tsx
'use client'

import { Spin } from 'antd'

export function PageLoading() {
  return (
    <div className="flex items-center justify-center h-[calc(100vh)]">
      <Spin size="large" tip="Loading page..." />
    </div>
  )
}