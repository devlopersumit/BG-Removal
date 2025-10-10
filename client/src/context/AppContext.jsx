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

  // ✅ Load credits from backend
  const loadCreditsData = async () => {
    try {
      const token = await getToken();

      if (!token) throw new Error("Authentication token not found");

      const { data } = await axios.get(`${backendUrl}/api/user/credits`, {
        headers: { token },
      });

      if (data && data.creditBalance !== undefined) {
        setCredit(data.creditBalance);
        console.log("Credit balance:", data.creditBalance);
      } else {
        toast.error("Failed to load credits");
      }
    } catch (error) {
      console.error("Error loading credits:", error);
      toast.error("Failed to load credits");
    }
  };

  // ✅ Remove Background
  const removeBg = async (image) => {
    try {
      if (!isSignedIn) {
        openSignIn();
        return;
      }

      setImage(image);
      setResultImage(false);

      navigate("/result");

      const token = await getToken();
      if (!token) throw new Error("Authentication token not found");

      const formData = new FormData();
      formData.append("image", image);

      const { data } = await axios.post(
        `${backendUrl}/api/image/removebg`,
        formData,
        { headers: { token } }
      );

      // ✅ Success Case
      if (data && data.resultImage) {
        setResultImage(data.resultImage);
        setCredit(data.creditBalance ?? credit);
        toast.success("Background removed successfully");
      }

    } catch (error) {
      console.error("Error removing background:", error);

      // ✅ Handle insufficient credits (403 Forbidden)
      if (error.response?.status === 403) {
        toast.info(
          "You have run out of credits. Please buy more to continue using the service."
        );
        setCredit(0);
        setImage(null);
        setResultImage(false);
        navigate("/buy");
        return;
      }

      // ✅ Handle user not found (404)
      if (error.response?.status === 404) {
        toast.error("User not found. Please sign in again.");
        return;
      }

      // ✅ Handle other server errors (500)
      if (error.response?.status === 500) {
        toast.error("Server error. Please try again later.");
        return;
      }

      // ✅ Generic fallback
      toast.error("Failed to remove background. Please try again.");
    }
  };

  const value = {
    credit,
    setCredit,
    loadCreditsData,
    backendUrl,
    image,
    setImage,
    removeBg,
    resultImage,
    setResultImage,
  };

  return (
    <AppContext.Provider value={value}>
      {props.children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
