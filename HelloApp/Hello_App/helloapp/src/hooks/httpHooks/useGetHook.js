import noNested from "../../modules/noNested";
import useAxiosPrivate from "../usefulHooks/useAxiosPrivate";

export default function useGetHook() {
  const axiosPrivate = useAxiosPrivate();

  async function GET(link) {
    let url = `/${link}`;

    try {
      const controller = new AbortController();
      const getData = await axiosPrivate.get(url, {
        signal: controller.signal,
      });
      controller.abort();
      return noNested(getData, ["status", "data"], ["data"]);
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

  return GET;
}
