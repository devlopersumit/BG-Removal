import { useState, createContext } from "react";
import { useAuth, useClerk, useUser } from "@clerk/clerk-react";
import axios from "axios";
import { toast } from "react-toastify";
import { set } from "mongoose";
import { useNavigate } from "react-router-dom";

export const AppContext = createContext();

const AppContextProvider = (props) => {
  const [credit, setCredit] = useState(false);
  const [image, setImage] = useState(null);
  const [resultImage, setResultImage] = useState(false);

  const backendUrl = import.meta.env.VITE_BACKEND_URL; 

  const navigate = useNavigate();

  const { getToken } = useAuth();
  const { isSignedIn } = useUser();
  const { openSignIn } = useClerk();

  const loadCreditsData = async () => {
    try {
      const token = await getToken();

      if (!token) {
        throw new Error("Authentication token not found");
      }

      const { data } = await axios.get(backendUrl + '/api/user/credits', {headers: { token }});

      if (data && data.creditBalance !== undefined) {
        setCredit(data.creditBalance);
        console.log(data.creditBalance);
      } else {
        toast.error("Failed to load credits");
      }

    }catch (error) {
  if (error.response) {
    // Backend responded but with error code (like 401 or 404)
    console.error("🔴 Server error:", error.response.status, error.response.data);
  } else if (error.request) {
    // Request made but no response
    console.error("🟠 No response from server:", error.request);
  } else {
    // Something else (like config issue)
    console.error("🟡 Request setup error:", error.message);
  }
  toast.error("Failed to load credits. Check console for details.");
}

  };

  const removeBg = async (image) => {
    try {
        if(!isSignedIn) {
            openSignIn();
            return;
        }
        setImage(image);
        setResultImage(false);

        navigate('/result');

    } catch (error) {
      console.error("Error removing background:", error);
      toast.error("Failed to remove background");
    }
  }

  const value = { credit, setCredit, loadCreditsData, backendUrl, image, setImage, removeBg };

  return (
    <AppContext.Provider value={value}>
      {props.children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
