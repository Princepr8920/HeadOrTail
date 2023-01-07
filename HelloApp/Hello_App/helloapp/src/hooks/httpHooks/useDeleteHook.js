import useAxiosPrivate from "../usefulHooks/useAxiosPrivate"
import noNested from "../../modules/noNested";

export default function useDeleteHook() {
  const axiosPrivate = useAxiosPrivate()
  async function DELETE(link) {
    let url = `/${link}`;
    let option = {
      withCredentials: true,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8",
      },
    };

    try {
      const getData = await axiosPrivate.delete(url, option);
      return noNested(getData, ["status", "message", "data"], ["data"]);
    } catch (err) {
      const error = err.response
        ? noNested(err, ["status", "data"], ["data"])
        : {
            data: {
              message: err.message || "something went wrong",
              status: err.request.status || 500,
              success: false,
            },
          };
      return error;
    }
  }

  return DELETE;
}
