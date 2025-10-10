import axios from "axios";
import fs from "fs";
import FormData from "form-data";
import userModel from "../modals/userModal.js";

//API Controller Function to remove background from image
// https://localhost:4000/api/image/removebg

 const removeBgImage = async (req, res) => {  
    try {

        const clerkId = req.user.clerkId;
        const user = await userModel.findOne({ clerkId });

        if(!user) {
            return res.status(404).json({ message: "User not found" });
        }
        if(user.creditBalance <= 0) {
            return res.status(403).json({ message: "Insufficient credits", creditBalance: user.creditBalance });
        }       
        
        const imagePath = req.file.path;

        // Reading the image file
        const imageFile = fs.createReadStream(imagePath);

        // Prepare form data for the API request
        const formData = new FormData();
        formData.append('image_file', imageFile);
        formData.append('bg_color', 'white');
        formData.append('format', 'png');

        // Call ClipDrop API to remove background
        const response = await axios.post('https://clipdrop-api.co/remove-background/v1', formData, {
            headers: {
                'x-api-key': process.env.CLIPDROP_API_KEY,
                ...formData.getHeaders()
            },
            responseType: 'arraybuffer' // Important to get image data
        });

        const base64Image = Buffer.from(response.data, 'binary').toString('base64');

        const resultImage = `data:${req.file.mimetype};base64,${base64Image}`;
        // Deduct one credit from user
        await userModel.findOneAndUpdate(
            { _id: user._id },
            { creditBalance: user.creditBalance - 1 }
        );

        res.status(200).json({ message: "Background removed successfully", image: resultImage, creditBalance: user.creditBalance - 1 });

        if(response.status !== 200) {
            console.error("Error from ClipDrop API:", response.status, response.data);
            return res.status(500).json({ message: "Failed to remove background" });
        }


    } catch(error) {
        console.error("Error in removeBg controller:", error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
 }

 export { removeBgImage };