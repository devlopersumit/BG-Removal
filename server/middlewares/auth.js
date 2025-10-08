import jwt from "jsonwebtoken";

//Middleware function to decode jwt token to get clerkId

const authUser = async (req, res, next) => {
    try{
        
    }catch(error){
        console.error('Error in auth middleware:', error.message);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

export default authUser;