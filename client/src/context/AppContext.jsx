import { useState, createContext } from "react";
import { useAuth } from "@clerk/clerk-react";
import axios from "axios";
import { toast } from "react-toastify";

export const AppContext = createContext();

const AppContextProvider = (props) => {
  const [credit, setCredit] = useState(false);

  const backendUrl = import.meta.env.VITE_BACKEND_URL; 
  const { getToken } = useAuth();

  const loadCreditsData = async () => {
    try {
      const token = await getToken();

      if (!token) {
        throw new Error("Authentication token not found");
      }

      const { data } = await axios.get(backendUrl + '/api/user/credits', {headers: { token }});

      if (data.success) {
        setCredit(data.credits);
        console.log(data.credits);
        
      } else {
        toast.error("Failed to load credits");
      }

      console.log("Credits loaded:", data.credits);

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

  return (
    <AppContext.Provider value={{ credit, setCredit, loadCreditsData, backendUrl }}>
      {props.children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
