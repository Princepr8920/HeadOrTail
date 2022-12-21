import usePatchHook from "../../httpHooks/usePatchHook";
import useAuth from "../../usefulHooks/useAuth";

export default function useSecurityEdit() {
  const PATCH = usePatchHook();
  const { setAuth } = useAuth();
  async function SUBMIT_DATA(info) {
    let url = "user/profile/edit";
    const {
      data: { message, success, user },
      status,
    } = await PATCH(info, url);
    if (status === 200) {
      setAuth((rest) => ({ ...rest, user }));
    }

    return { message, status, success };
  }

  return SUBMIT_DATA;
}
