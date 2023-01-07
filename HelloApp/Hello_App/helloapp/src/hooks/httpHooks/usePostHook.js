import useAxiosPrivate from "../usefulHooks/useAxiosPrivate"
import noNested from "../../modules/noNested";

export default function usePostHook() {
  const axiosPrivate = useAxiosPrivate()
  async function POST(info, link) {
    let url = `/${link}`;

    let data = JSON.stringify(info);
    let option = {
      withCredentials: true,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8",
      },
    };

    try {
      const sendData = await axiosPrivate.post(url, data, option);
      return noNested(sendData, ["status", "data"], ["data"]);
    } catch (err) {
      const error = err.response
        ? noNested(err, ["status", "data"], ["data"])
        : {
            status: err.request.status || 500,
            data: {
              message: err.message || "Something went wrong",
              success: false,
            },
          };
      return error;
    }
  }

  return POST;
}
