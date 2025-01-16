"use client"
import React, { useEffect, useState } from 'react'

export default function News() {

  const [news,Setnews] = useState([])
  const [mainarticles,Setmainarticles] = useState(2)
  const [LoadNews,SetLoadNews] = useState(-3)

  useEffect(() => {
    fetch(`https://saurav.tech/NewsAPI/top-headlines/category/health/in.json`).then(res=>res.json()).then(data=>Setnews(data.articles));
  }, [])
  
  console.log(news)
  return (

  <>
    <div className="flex-col justify-start mt-5">
      {
        news.slice(0,mainarticles).map((content)=>(
          <>
         <a href={content.url} target='blank'>
         <div className="flex justify-start bg-slate-400 mt-5 rounded-xl">
          <div className="flex-col justify-start gap-20">
          <div className="">
            <img className='rounded-xl' src={content.urlToImage} alt="" />
          </div>
          <div className=" p-2">
            <h3 className='text-xl font-extrabold text-black'>{content.author}</h3>
            <p className='text-xs'>{content.content}</p>
          </div>
          </div>
          </div>
         </a>
          </>
        ))
      }
      <div className="flex justify-start gap-5 mt-2">

        <button onClick={()=>{
          Setmainarticles(mainarticles - 4)
        }} className='bg-purple-600 p-1'>Previous</button>

      <button onClick={()=>{
        Setmainarticles(mainarticles + 3)
      }} className='bg-purple-600 p-1'>Load More</button>

      <button onClick={()=>{
            SetLoadNews( LoadNews + 2 )
        }}  className='bg-purple-600 p-1'>New News</button>
      </div>
    </div>
  </>

  )
}