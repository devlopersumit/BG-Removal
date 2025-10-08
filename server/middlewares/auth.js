import jwt from "jsonwebtoken";

//Middleware function to decode jwt token to get clerkId

const authUser = async (req, res, next) => {
    try{
        const {token} = req.headers;
        if(!token){
            return res.status(401).json({message: 'No token provided'});
        }
        const token_decode = jwt.decode(token);
        req.body.clerkId = token_decode.clerkId;
        next();

    }catch(error){
        console.error('Error in auth middleware:', error.message);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

export default authUser;