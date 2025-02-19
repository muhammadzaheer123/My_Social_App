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
        required: true
    },
    name:{
        type:String,
        required:true
    },
    username: {
        type: String,
        required: true
    },
    profileimage: {
        type: String,
        required: true
    },
    comments: {
        type: [{ comment, String }],
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
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
        type: [{ like, String }],
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
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

const POST = new mongoose.models.POST || mongoose.model("post",POSTSCHEMA)

export default POST;
