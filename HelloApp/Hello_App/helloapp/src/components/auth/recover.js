import { useState } from "react"; 
import useRecover from "../../hooks/componentHooks/recoverHook";

import "./login&signupCss.scss"

export default function Recover() {
  const SUBMIT_EMAIL = useRecover()
  let [getValue, setValue] = useState({
    email: "",
    error: {},
  });

  async function submitData(e) {
    e.preventDefault();
    const { message, status } = await SUBMIT_EMAIL({email:getValue.email});
    message && status
      ? setValue((rest) => ({ ...rest, error: { message, status } }))
      : setValue((rest) => ({
          ...rest,
          email: "", 
          error: { message, status },
        }));
  }
 
  function handleChange(e) {
    const {value,name} = e.target;
    setValue((rest) => ({ ...rest, [name]: value,error:{} }));
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
                onChange={handleChange}
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
