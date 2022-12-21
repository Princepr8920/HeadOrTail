import axios from "../api/axios";

export default function usePostHook() {
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
      const sendData = await axios.post(url, data, option);
      console.log(sendData)
      return sendData;
    } catch (err) {
      console.error(err)
      const error = err.response;
      return error;
    }

    
  }

  return POST;
}
