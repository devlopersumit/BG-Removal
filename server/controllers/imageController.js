import axios from "axios";
import fs from "fs";
import FormData from "form-data";
import userModel from "../modals/userModal.js";

//API Controller Function to remove background from image
// https://localhost:4000/api/image/removebg

export const removeBgImage = async (req, res) => {  
    try {

    } catch(error) {
        console.error("Error in removeBg controller:", error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
 }

 export { removeBgImage };