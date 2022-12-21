import axios from "../../api/axios";
import useAuth from "./useAuth";

export const useRefreshToken = () => {
  const { setAuth } = useAuth();

  let refresh = async () => {
    console.log("i am refresh")
    let response = await axios.get("/refresh", { withCredentials: true });
    setAuth((rest) => ({
      ...rest,
      accessToken: response.data?.accessToken,
      user: response.data?.userWithToken 
    })); 
    return response.data?.accessToken;
  };
  return refresh;
};

export default useRefreshToken;
