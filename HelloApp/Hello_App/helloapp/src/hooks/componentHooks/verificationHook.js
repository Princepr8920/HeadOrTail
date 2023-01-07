import useGetHook from "../httpHooks/useGetHook";
import usePostHook from "../httpHooks/usePostHook";
import useAuth from "../usefulHooks/useAuth";
import useView from "../usefulHooks/useView";

export default function useVerificationHook() {
  const GET = useGetHook();
  const POST = usePostHook();
  const { setView } = useView();
  const { setAuth } = useAuth();

  async function SUBMIT_CODE(info) {
    const {
      data: { message, success, user },
      status,
    } = await POST(info, "user/email/verification/done");
    console.log(message)
    if (status === 200) {
      setAuth((rest) => ({ ...rest, user }));
      setView((rest) => ({
        ...rest,
        verification: { isVerified: success },
        edit_operation: { success, message },
      }));
    }
    return { message, success, status };
  }

  async function RESEND_CODE() {
    const {
      data: { message, success,time },
      status,
    } = await GET("user/email/verificaiton/resend");

    if (status === 200) {
      setView((rest) => ({ ...rest, waiting: true }));
    }
    return { message, success, status,time };
  }

  return { SUBMIT_CODE, RESEND_CODE };
}
