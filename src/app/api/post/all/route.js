import { connectDB } from "../../../../Library/mongoose/ConnectDB"
import Post from "../../../../Library/model/post.model"


export const POST = async (req) => {
    try {
        await connectDB()
        const feedposts = await Post.find().sort({ createdAt: -1 })
        return new Response(JSON.stringify(feedposts), {
            status: 200
        })

    } catch (error) {
        console.log()
    }
}