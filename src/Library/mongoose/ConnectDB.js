import mongoose from "mongoose";

let initialized = false;

export const ConnectBase = ()=>{
    mongoose.set("strictQuery",true)
    
    if (initialized) {
        console.log(`Data Base Already Connected`)
        return;
    }

    try {
        mongoose.connect(process.env.MONGO_URL,{
            dbName:"Social App",
            usenewurlparser:true,
            useunifiedtopology:true,
        })
        console.log("Your Data Base Connected Succesfully");
        initialized = true;
    } catch (error) {
        console.log(`We Occupied An error In Your Data Base ${error}`);
    }
}