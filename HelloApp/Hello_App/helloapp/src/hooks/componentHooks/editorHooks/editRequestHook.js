import usePatchHook from "../../httpHooks/usePatchHook";
import useAuth from "../../usefulHooks/useAuth";

export default function useSecurityEdit() {
  const PATCH = usePatchHook();
  const { setAuth } = useAuth();
  async function SUBMIT_DATA(info) {
    console.log(info)
    let url = "user/profile/edit";
    const { data, status } = await PATCH(info, url);
    if (status === 200) {
      setAuth((rest) => ({ ...rest, user: data.user }));
    }
    console.log(data)
    return { data, status };
  }

  return SUBMIT_DATA;
}
