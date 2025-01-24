import User from "../model/user";
import { ConnectBase } from "../mongoose/ConnectDB";

export const CreateAndUpdate = async(
    id,
    first_name,
    last_name,
    image_url,
    username,
    email_addresses
)=>{
    try {
        await ConnectBase();
        const user = User.findOneAndUpdate(
            {clerkID:id},{
                $set:{
                    email:email_addresses[0].email_address,
                    firstname:first_name,
                    lastname:last_name,
                    username:username,
                    avatar:image_url             
                }
            },
            {new:true,upsert:true}
        )
        return user
    } catch (error) {
        console.log(`Error In createOrUpdateUSer: ${error}`)    
    }   
}