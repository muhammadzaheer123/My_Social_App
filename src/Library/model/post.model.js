import mongoose from "mongoose";

const POSTSCHEMA = new mongoose.Schema({
    text: {
        type: String,
        required: true
    },
    image: {
        type: String
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        
    },
    name:{
        type:String,
        required:true
    },
    username: {
        type: String,
        required: true
    },
    profileImg: {
        type: String,
        required: true
    },
    comments: {
        comment:{
            type:String
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
        name: {
            type: String,
        },
        username: {
            type: String
        },
        profileimage: {
            type: String
        },
        createdAt: {
            type: String,
            default: Date.now()
        }
    },
    likes: {
        like:{
            type:String
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",

        },
        name: {
            type: String,
        },
        username: {
            type: String
        },
        profileimage: {
            type: String
        },
        createdAt: {
            type: String,
            default: Date.now()
        }
    },

},
    { timestamps: true }
);

const POST = mongoose.models.post || mongoose.model("post",POSTSCHEMA)

export default POST;
