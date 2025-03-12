import React from 'react'
import Input from '../../components/Input'

export default async function page() {

  let data = null;
  try {
    const result = await fetch("https://my-social-app-psi.vercel.app/api/post/all", {
      method: "POST",
      cache: "no-store",
    })
    data = await result.json()
  } catch (error) {
    console.log(error)
  }

  return (
    <>
      <div>
        <Input />
      </div>
    </>
  )
}
