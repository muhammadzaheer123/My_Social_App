import { Webhook } from 'svix';
import { headers } from 'next/headers';
import { clerkClient } from '@clerk/nextjs/server';
import { createOrUpdateUser} from '../../../Library/Actions/user';

export async function POST(req) {
    const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET;

    if (!WEBHOOK_SECRET) {
        console.error('WEBHOOK_SECRET is not defined in the environment variables.');
        return new Response('Server configuration error', { status: 500 });
    }

    const headerPayload = headers();
    const svix_id = headerPayload.get('svix-id');
    const svix_timestamp = headerPayload.get('svix-timestamp');
    const svix_signature = headerPayload.get('svix-signature');

    if (!svix_id || !svix_timestamp || !svix_signature) {
        console.error('Missing required Svix headers');
        return new Response('Missing required Svix headers', { status: 400 });
    }

    const payload = await req.json();
    const body = JSON.stringify(payload);

    const webhook = new Webhook(WEBHOOK_SECRET);

    let event;
    try {
        event = webhook.verify(body, {
            'svix-id': svix_id,
            'svix-timestamp': svix_timestamp,
            'svix-signature': svix_signature,
        });
    } catch (err) {
        console.error('Webhook verification failed:', err.message);
        return new Response('Invalid webhook signature', { status: 400 });
    }

    const eventType = event?.type;
    const eventData = event?.data;

    if (!eventType || !eventData) {
        console.error('Invalid webhook payload:', event);
        return new Response('Invalid webhook payload', { status: 400 });
    }

    console.log(`Webhook received. ID: ${eventData.id}, Type: ${eventType}`);

    try {
        if (eventType === 'user.created' || eventType === 'user.updated') {
            const { id, first_name, last_name, image_url, email_addresses, username } = eventData;

            if (!id || !email_addresses) {
                console.error('Invalid user data:', eventData);
                return new Response('Invalid user data', { status: 400 });
            }

            const user = await createOrUpdateUser(id, first_name, last_name, image_url, email_addresses, username);

            if (user && eventType === 'user.created') {
                try {
                    await clerkClient.users.updateUserMetadata(id, {
                        publicMetadata: { userMongoId: user._id },
                    });
                } catch (err) {
                    console.error('Error updating user metadata:', err.message);
                }
            }
        } 
    } catch (err) {
        console.error(`Error handling webhook event (${eventType}):`, err.message);
        return new Response('Error processing webhook', { status: 500 });
    }

    return new Response('Webhook processed successfully', { status: 200 });
}