"use client"
import React, { useRef, useState } from 'react'
import { useUser } from '@clerk/nextjs';
import { IoClose } from "react-icons/io5";
import { CldUploadWidget } from 'next-cloudinary';

export default function Input() {

  const FIRSTIMAGESLECTOR = useRef(null);
  const [FIRSTSELECTIAMGE, SETFIRSTSELECTIAMGE] = useState(null);
  const { user, isSignedIn, isLoaded } = useUser();
  const [UploadImage, SetUploadImage] = useState(null);
  const [PostLoading, SetPostLoading] = useState(false);
  const [Input, SetInput] = useState("");

  if (!user || !isSignedIn || !isLoaded) {
    return null;
  }

  const IMAGEHANDLER = (e) => {
    const FILE = e.target.files[0];
    if (FILE) {
      SETFIRSTSELECTIAMGE(URL.createObjectURL(FILE));
    }
  }

  const HandleImageUpload = (result) => {
    if (result.event = "succes") {
      SetUploadImage(result.info.secure_url);
    }
  }

  const HandlePostImage = async () => {
    SetPostLoading(true);

    const response = await fetch("/api/post/create", {
      body: JSON.stringify({
        userMongoId: user.publicMetadata.userMongoId,
        name: user.fullName,
        username: user.username,
        text: input,
        profileImg: user.imageUrl,
        image: selectedImage,
      }),
    })
    SetPostLoading(false);
    SetInput("");
    UploadImage(null);
  }

  return (

    <>

      <div className='w-[100%] h-[100%] bg-slate-50 justify-center'>
        <div className="w-[80%] h-[100%] m-auto p-3 bg-slate-600">
          <textarea className='w-[400px] p-3 text-black' type="text" placeholder='Leave Your Content' rows={2} />
        </div>
        <div className="w-[100%] h-[100%] flex justify-between p-3">
          <div className="">
            <CldUploadWidget uploadPreset="socialapp" onUpload={HandleImageUpload}>
              {({ open }) => {
                return (
                  <button className='w-[140px] h-[35px] bg-purple-600 rounded-md p-1 font-serif text-[12px]' onClick={() => open()}>
                    Upload an Image
                  </button>
                );
              }}
            </CldUploadWidget>
          </div>
          <div className="">
            <button onClick={HandlePostImage} className=' bg-red-600 text-white p-1 w-[100px] h-[30px] rounded-md flex justify-center'>
              Post
            </button>
          </div>
        </div>
        {FIRSTSELECTIAMGE && (
          <div>
            <img src={FIRSTSELECTIAMGE} alt="Uploaded" className="w-[480px] rounded-lg shadow-md ml-16" />
          </div>
        )
        }
        {FIRSTSELECTIAMGE && (
          <div><IoClose
            size={30}
            className='ml-8'
            onClick={(e) => SETFIRSTSELECTIAMGE(null)}
          /></div>
        )
        }
        <div className="w-[60%] h-[100%]">
          <input hidden type="file" ref={FIRSTIMAGESLECTOR} accept='image/*' onChange={IMAGEHANDLER} />
        </div>
      </div>
    </>
  )
}
