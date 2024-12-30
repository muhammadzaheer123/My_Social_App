"use client"
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import News from './News'

export default function RightSidebar() {

    const [Input,SetInput] = useState('')
    const router = useRouter()

    const SearchHandler = (e)=> {
        e.preventDefault()
        if (!Input.trim()) return
        router.push(`/search/${Input}`)
        let INPUT = document.getElementById("Input").value = ""
    }

  return (
    <>
   
        <form onSubmit={SearchHandler}>
            <input id='Input' className='text-black border-none outline-none p-1 rounded-xl' type="search" value={Input} onChange={(e)=>SetInput(e.target.value)} />
        </form>
        <News/>
    </>
  )
}
