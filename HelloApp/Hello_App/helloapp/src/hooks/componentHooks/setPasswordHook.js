import { useParams, useNavigate } from "react-router-dom"; 
import usePostHook from "../../hooks/httpHooks/usePostHook";

export default function useSetPassword() {
  const POST = usePostHook(); 
  let params = useParams();
  let navigate = useNavigate();
  let { id, token } = params;

  async function SET_PASSWORD(password) {
    let {
      status, data:{message,success},
    } = await POST(password, `user/password/setnewpassword/${token}`);
    console.log(message,success)
    if (status !== 200) {
      return {
        message,
        status,
        success,
      };
    } else { 
      navigate("/success", { replace: true });
      return {
        message,
        status,
        success,
      };
    }
  }
  return SET_PASSWORD;
}
