import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../..//hooks/useAuth";
import usePostHook from "../../hooks/usePostHook";

export default function Recover() {
  const POST = usePostHook();
  let { setAuth } = useAuth();
  const navigate = useNavigate(); 
  let [getValue, setValue] = useState({
    email: "",
    error: {},
  });

  async function submitData(e) {
    e.preventDefault();
    let info = { email: getValue.email };
     let response = await POST(info, "user/password/recovery");
     console.log(response)
    if (response.error) {
      let { message, status } = response.error;
      setValue((rest) => ({
        ...rest,
        error: {
          message: message,
          status: status,
        },
      }));
    } else {
      setAuth(response.data);
      return navigate("/email/success", { replace: true });
    }
  }


  
  function handleChange(e, name) {
    let value = e.target.value;
    setValue((rest) => ({ ...rest, [name]: value }));
  }
  return (
    <div className="login-container">
      <div id="info-container">
        <div id="resetPassword">
        <h3>Reset password </h3>
        <p id="">Enter your registered email below to reset your password</p>
        </div>
        <form onSubmit={submitData}>
          <div id="forms">
            <div key="email" className="input-container">
              <input
                type="email"
                className={
                  (getValue.error.status === 409 &&
                    getValue.error.message !==
                      "That username is taken. Try another") ||
                  getValue.error.status === 404
                    ? "userInfo  sign-input formError"
                    : "userInfo  sign-input"
                }
                name="email"
                value={getValue.email}
                onChange={(e) => handleChange(e, "email")}
                placeholder="Email"
                required
              />
              <div className="errors">
                {(getValue.error.status === 409 &&
                  getValue.error.message !==
                    "That username is taken. Try another") ||
                getValue.error.status === 404 ? (
                  <span>
                    <i className="fas fa-exclamation-circle"></i>{" "}
                    {getValue.error.message}
                  </span>
                ) : (
                  ""
                )}
              </div>
            </div>
          </div>
          <input
            type="submit"
            value="Submit"
            className="submit-form sign-input"
          />
        </form>
      </div>
    </div>
  );
}
