import { Webhook } from "svix";
import { headers } from "next/headers";

export async function POST(req) {
  const WEB_HOOK_KEY = process.env.WEBHOOK_SECRET_KEY

  if (!WEB_HOOK_KEY) {
    throw Error(`Please Check Your WEBHOOK_SEC_KEY`)
  }


  const HeaderPayLoad = headers()
  const svix_id = HeaderPayLoad.get("svix_id")
  const svix_timestamp = HeaderPayLoad.get("svix_timestamp")
  const svix_signature = HeaderPayLoad.get("svix_signature")

  if (!svix_id || !svix_timestamp || !svix_signature) {
    throw Error(`Please Check Your Svix_id,Timestamp & signature`)
  }

  // Get the body
  const payload = await req.json()
  const body = JSON.stringify(payload)
  
  // Create a new Svix instance with your secret.
  const wh = new Webhook(WEB_HOOK_KEY)

  let evt;

  // Verify the payload with the headers
  try {
    evt = wh.verify(body,{
      'svix-id':svix_id,
      'svix-signature':svix_signature,
      'svix-timestamp':svix_timestamp
    })
  } catch (err) {
    console.error('Error verifying webhook:', err);
    return new Response('Error occured', {
      status: 400,
    });
  }

}
