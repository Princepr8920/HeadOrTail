import { useNavigate } from "react-router-dom";
import usePostHook from "../../hooks/httpHooks/usePostHook";
import useAuth from "../../hooks/usefulHooks/useAuth";

export default function useSignup() {
  const POST = usePostHook();
  const navigate = useNavigate();
  const { setAuth } = useAuth();

  async function SUBMIT_DATA(info) {
    const response = await POST(info, "signup");
    console.log(response);
    if (!response?.data?.success) {
      const { message, status } = response.data;
      return { message: message, status: status };
    } else {
      setAuth(response?.data);
      navigate("/verify/user/account", { replace: true });
      return { message: response.data.message, status: response.data.status };
    }
  }

  return SUBMIT_DATA;
}
