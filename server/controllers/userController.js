import { Webhook } from "svix";
import userModel from "../modals/userModal.js";

//API Controller Function to manage clerk user with database
// https://localhost:4000/api/user/webhooks

const clerkWebhooks = async (req, res) => {
    try {
        const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET);
        await whook.verify(JSON.stringify(req.body), {
            'svix-id': req.headers['svix-id'],
            'svix-timestamp': req.headers['svix-timestamp'],
            'svix-signature': req.headers['svix-signature']
        });
        const { data, type } = req.body;
        console.log('✅ Clerk Webhook Verified:', type);

        //Handle user created event
        switch (type) {
            case 'user.created': {
                const userData = {
                    clerkId: data.id,
                    emailId: data.email_addresses[0].email_address,
                    firstName: data.first_name,
                    lastName: data.last_name,
                    photo: data.image_url,
                }
                //Check if user already exists
                const existingUser = await userModel.findOne({ clerkId: data.id });
                if (existingUser) {
                    console.log('User already exists:', existingUser.emailId);
                    return res.status(200).json({ message: 'User already exists' });
                }
                //Create new user
                const newUser = new userModel(userData);
                await newUser.save();
                console.log('New user created:', newUser.emailId);
                res.status(201).json({ message: 'User created successfully', user: newUser });
                break
            }

            case 'user.updated': {
                const updatedData = {
                    emailId: data.email_addresses[0].email_address,
                    firstName: data.first_name,
                    lastName: data.last_name,
                    photo: data.image_url,
                }
                const updatedUser = await userModel.findOneAndUpdate(
                    { clerkId: data.id },
                    updatedData,
                    { new: true }
                );

                if (!updatedUser) {
                    return res.status(404).json({ message: 'User not found' });
                }
                console.log('User updated:', updatedUser.emailId);
                res.status(200).json({ message: 'User updated successfully', user: updatedUser });
                res.status(200).json({ message: 'User updated successfully', user: updatedUser });
                break
            }

            case 'user.deleted': {
                const deletedUser = await userModel.findOneAndDelete({ clerkId: data.id });
                if (!deletedUser) {
                    return res.status(404).json({ message: 'User not found' });
                }
                console.log('User deleted:', deletedUser.emailId);
                res.status(200).json({ message: 'User deleted successfully' });
                break;
            }

            default:
                console.log(`Unhandled event type: ${type}`);
        }
    } catch (error) {
        console.error('Error in clerk webhook:', error.message);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

//API Controller function to get user available credits
const userCredits = async (req, res) => {  
    try {
        const { clerkId } = req.user;

        if (!clerkId) {
            return res.status(400).json({ message: 'clerkId is required' });
        }
        const user = await userModel.findOne({ clerkId });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({ creditBalance: user.creditBalance });
    } catch (error) {
        console.error('Error fetching user credits:', error.message);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

export { clerkWebhooks, userCredits };