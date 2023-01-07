import { useLocation, useNavigate } from "react-router-dom";
import usePostHook from "../httpHooks/usePostHook";
import useAuth from "../../hooks/usefulHooks/useAuth";

export default function useLogin() {
  const POST = usePostHook();
  const { setAuth } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  async function SUBMIT_DATA(info) {
    const response = await POST(info, "login");  
    if (response.status !== 200 && response.status !== 202) { 
      return { message: response.data.message, status: response.status };
    } else {
      const { data, status } = response;
      if (status === 202) {
        setAuth(data);
        navigate("/verify/user/account", { replace: true });
      } else {
        const { user, accessToken } = data;
        setAuth({ user, accessToken });
        navigate(from, { replace: true });
      }
      return { message: "", status: status };
    }
  }

  return SUBMIT_DATA;
}
