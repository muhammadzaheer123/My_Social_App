import { connectDB } from "../../../../Library/mongoose/ConnectDB"
import POST from "../../../../Library/model/post.model"


export const Post = async (req) => {
    try {
        await connectDB()
        const feedposts = await POST.find().sort({ createdAt: -1 })
        return new Response(JSON.stringify(feedposts), {
            status: 200
        })

    } catch (error) {
        console.log()
    }
}