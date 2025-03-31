'use client';

import { Button, DatePicker } from "antd";

export default function Page () {
  const fetchData = async () => {
    const response = await fetch('/api/users', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await response.json();
    console.log('data', data);
  };

  return (
    <div>
      <Button onClick={fetchData}>send api</Button>
      <DatePicker />
    </div>
  )
}