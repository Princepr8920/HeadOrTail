import axios from "../../api/axios";
import useAuth from "../usefulHooks/useAuth";

const useLogout = () => {
  let { setAuth } = useAuth();
  let logout = async () => {
    
    try {
      setAuth({});
      await axios.get("/logout", { withCredentials: "include" });
    } catch (error) {
      console.error(error);
    }
  };

  return logout;
};

export default useLogout
