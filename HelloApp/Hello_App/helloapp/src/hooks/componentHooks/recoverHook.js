import { useNavigate } from "react-router-dom";
import useAuth from "../..//hooks/usefulHooks/useAuth";
import usePostHook from "../../hooks/httpHooks/usePostHook";

export default function useRecover() {
  const POST = usePostHook();
  let { setAuth } = useAuth();
  const navigate = useNavigate();

  async function SUBMIT_EMAIL(info) {
    let response = await POST(info, "user/password/recovery");
    if (response?.error) {
      let { message, status } = response.error;
      return { message: message, status: status };
    } else {
      setAuth(response.data);
      navigate("/email/success", { replace: true });
      return { message: "", status: "" };
    }
  }

  return SUBMIT_EMAIL;
}
