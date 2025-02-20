// "use client"
// import React, { useRef, useState } from 'react'
// import { useUser } from '@clerk/nextjs';
// import { IoClose } from "react-icons/io5";
// import { CldUploadWidget } from 'next-cloudinary';

// export default function Input() {

//   const FIRSTIMAGESLECTOR = useRef(null);
//   const [FIRSTSELECTIAMGE, SETFIRSTSELECTIAMGE] = useState(null);
//   const { user, isSignedIn, isLoaded } = useUser();
//   const [UploadImage, SetUploadImage] = useState(null);
//   const [PostLoading, SetPostLoading] = useState(false);
//   const [Input, SetInput] = useState("");

//   if (!user || !isSignedIn || !isLoaded) {
//     return null;
//   }

//   const IMAGEHANDLER = (e) => {
//     const FILE = e.target.files[0];
//     if (FILE) {
//       SETFIRSTSELECTIAMGE(URL.createObjectURL(FILE));
//     }
//   }

//   const HandleImageUpload = (result) => {
//     if (result.event = "succes") {
//       SetUploadImage(result.info.secure_url);
//     }
//   }

//   return (

//     <>

//       <div className='w-[100%] h-[100%] bg-slate-50 justify-center'>
//         <div className="w-[80%] h-[100%] m-auto p-3 bg-slate-600">
//           <textarea className='w-[400px] p-3 text-black' type="text" placeholder='Leave Your Content' rows={2} />
//         </div>
//         <div className="w-[100%] h-[100%] flex justify-between p-3">
//           <div className="">
//             <CldUploadWidget uploadPreset="socialapp" onUpload={HandleImageUpload}>
//               {({ open }) => {
//                 return (
//                   <button className='w-[140px] h-[35px] bg-purple-600 rounded-md p-1 font-serif text-[12px]' onClick={() => open()}>
//                     Upload an Image
//                   </button>
//                 );
//               }}
//             </CldUploadWidget>
//           </div>
//           <div className="">
//             <button onClick={HandlePostImage} className=' bg-red-600 text-white p-1 w-[100px] h-[30px] rounded-md flex justify-center'>
//               Post
//             </button>
//           </div>
//         </div>
//         {FIRSTSELECTIAMGE && (
//           <div>
//             <img src={FIRSTSELECTIAMGE} alt="Uploaded" className="w-[480px] rounded-lg shadow-md ml-16" />
//           </div>
//         )
//         }
//         {FIRSTSELECTIAMGE && (
//           <div><IoClose
//             size={30}
//             className='ml-8'
//             onClick={(e) => SETFIRSTSELECTIAMGE(null)}
//           /></div>
//         )
//         }
//         <div className="w-[60%] h-[100%]">
//           <input hidden type="file" ref={FIRSTIMAGESLECTOR} accept='image/*' onChange={IMAGEHANDLER} />
//         </div>
//       </div>
//     </>
//   )
// }
"use client"
import React, { useState } from 'react'
import { CldUploadWidget } from 'next-cloudinary';
import { useUser } from '@clerk/nextjs';

export default function Input() {

  const { user, isSignedIn, isLoaded } = useUser();
  const [ImageUpload, setImageUpload] = useState(null);
  const [Input, setInput] = useState("");
  const [PostLoading, setPostLoading] = useState(false);

  if (!user || !isSignedIn || !isLoaded) {
    return null;
  }
  const UploadImageHandler = (result) => {
    if (result.event = "success") {
      setImageUpload(result.info.secure_url)
    }
  }
  const PostUploadImage = async()=>{
    setPostLoading(true)
    alert("HELLO")

    const response = await fetch("/api/post/create",{
      method:"POST",
      headers:{
        "Content-Type": "application/json"
      },
      body:JSON.stringify({
        userMongoId: user.publicMetadata.userMongoId,
        name: user.fullName,
        username: user.username,
        text: Input,
        profileImg: user.imageUrl,
        image: ImageUpload,
      })
    })
    setInput("")
    setPostLoading(false)
    setImageUpload(null)
  }

  return (
    <>
      <div className="w-[100%] h-[100%] flex justify-center">
        <div className="w-[100%] h-[100%] flex-col justify-center p-3 bg-slate-50">
          <div className="w-[100%] h-[100%] flex justify-center">
            <textarea className='w-[100%] h-[100%] outline-none rounded-md pl-2 pt-1 text-black text-[12px] border-4 focus:border-4 focus:border-black' rows={2} name="" id="" placeholder='Enter Your Content'></textarea>
          </div>
          <div className="w-[100%] h-[100%] flex justify-between mt-2 p-2">
            <div className="text-black font-serif text-[13px]">
              <CldUploadWidget uploadPreset="pracsocialapp" onUpload={UploadImageHandler}>
                {({ open }) => {
                  return (
                    <button className='w-[140px] h-[30px] rounded-md bg-purple-600 text-white' onClick={() => open()}>
                      Upload an Image
                    </button>
                  );
                }}
              </CldUploadWidget>
            </div>
            <div className="text-black font-serif text-[15px]">
              <button onClick={PostUploadImage} className='w-[100px] h-[30px] rounded-md bg-purple-600 text-white'>
                Post
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
