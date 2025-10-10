import { useState, createContext } from "react";
import { useAuth, useClerk, useUser } from "@clerk/clerk-react";
import axios from "axios";
import { toast } from "react-toastify";
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

    } catch (error) {
      console.error("Error loading credits:", error);
      toast.error("Failed to load credits");
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

        const token = await getToken();
        if(!token) {
            throw new Error("Authentication token not found");
        }
        const formData = new FormData();
        image && formData.append('image', image);

        const { data } = await axios.post(backendUrl + '/api/image/removebg', formData, {
            headers: {token}
        });

        if (data && data.resultImage) {
            setResultImage(data.resultImage);
            data.creditBalance && setCredit(data.creditBalance);
            toast.success("Background removed successfully");
        } else {
            toast.error("Failed to remove background");
            if(data.creditBalance === 0) {
              navigate('/buy');
              toast.info("You have run out of credits. Please buy more credits to continue using the service.");
              setCredit(0);
              setResultImage(false);
              console.log('Result image from backend:', data.resultImage);

              setImage(null);
              return;
            }
        }
    } catch (error) {
      console.error("Error removing background:", error);
      toast.error("Failed to remove background");
    }
  }

  const value = { credit, setCredit, loadCreditsData, backendUrl, image, setImage, removeBg, resultImage, setResultImage };

  return (
    <AppContext.Provider value={value}>
      {props.children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
