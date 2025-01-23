import mongoose from "mongoose";

const USERSCHEMA = mongoose.Schema({
    clerkID:{
        type:String,
        required:true,
        unique:true
    },
    email:{
        type:String
    },
    firstname:{
        type:String,
        required:true
    },
    lastname:{
        type:String,
        required:true
    },
    username:{
        type:String,
        required:true
    },
    avatar:{
        type:String,
        required:true
    },
    followers:{
        type: [{type: Schema.Types.ObjectId, ref: 'author'}],
        default:true
    },
    following:{
        type: [{type: Schema.Types.ObjectId, ref: 'author'}],
        default:true
    }
})

const User = mongoose.models.User || mongoose.model('User', USERSCHEMA);

export default User