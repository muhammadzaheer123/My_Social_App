import Post from "../../../../Library/model/post.model"
import {connectDB} from "../../../../Library/mongoose/ConnectDB"
import {currentUser} from "@clerk/nextjs/server"
 
export async function POST (req) {
    const user = await currentUser(req);
    try {
        await connectDB();
        const DATA = await req.json();
        if (!user || user.publicMetadata.userMongoId ==! DATA.userMongoId) {
            return new Response ("unuthorized",{status:401})
        }
        const newPost = await Post.create({
            user:DATA.userMongoId,
            name:DATA.name,
            username:DATA.username,
            text:DATA.text,
            profileimage:DATA.profileimage,
            image:DATA.image
        })
        await newPost.save();
        return new Response(JSON.stringify(newPost),{
            status:201
        });
    } catch (error) {
        console.log(error)
        return new Response("Internal Server Error",{
            status:500
        });
    };
}