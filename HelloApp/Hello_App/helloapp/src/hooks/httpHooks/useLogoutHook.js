import useAxiosPrivate from "../usefulHooks/useAxiosPrivate"
import useAuth from "../usefulHooks/useAuth";

const useLogout = () => {
  const axiosPrivate = useAxiosPrivate()
  let { setAuth } = useAuth();
  let logout = async () => {
    
    try {
      setAuth({});
      await axiosPrivate.get("/logout");
    } catch (error) {
      console.error(error);
    }
  };

  return logout;
};

export default useLogout
