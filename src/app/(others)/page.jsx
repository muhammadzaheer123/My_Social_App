import React from 'react'
import Input from '../../components/Input'
import { FaComment } from "react-icons/fa";
import { IoMdShareAlt } from "react-icons/io";
import { AiFillLike } from "react-icons/ai";
import "../(others)/style/page.css"

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

  const UserProfileImage = "https://e7.pngegg.com/pngimages/304/275/png-clipart-user-profile-computer-icons-profile-miscellaneous-logo-thumbnail.png"
  const PostImag = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTtnvAOajH9gS4C30cRF7rD_voaTAKly2Ntaw&s"

  return (
    <>
      <div>
        <Input />
      </div>

      {
        data.map((content) => (
          <>
            <div className="MAin-Post-Container">
              <div className="MAin-Post-Content">
                <div className="UserNamebar">
                  <div className="Main-user-profile">
                    <img src={UserProfileImage} alt="" />
                  </div>
                  <div className="Main-user-Nameees">
                    <h3>Muhammad Zaheer</h3>
                    <p>Zaheer665@gmail.com</p>
                  </div>
                </div>
                <div className="Post-Image">
                  <img src={PostImag} alt="" />
                </div>
                <div className="Post-Likes-etc">
                  <div className='Likes'><span><AiFillLike color='#000000' /></span><h1>Likes</h1></div>
                  <div className='commentss'><span><FaComment color='#000000' /></span><h1>Comments</h1></div>
                  <div className='shares'><span><IoMdShareAlt color='#000000' /></span><h1>Share</h1></div>
                </div>
              </div>
            </div>
          </>
        ))
      }
    </>
  )
}
