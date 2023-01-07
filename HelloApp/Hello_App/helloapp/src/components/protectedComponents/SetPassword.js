import { useState } from "react";
import useSetPassword from "../../hooks/componentHooks/setPasswordHook";
import Spinner from "../usefulComponents/loadingComponents/spinner";

export default function SetPassword() {
  const SET_PASSWORD = useSetPassword();
  let [getValue, setValue] = useState({
    newPassword: "",
    confirmNewPassword: "",
    error: {},
    isLoaded: true,
  });

  function handleChange(e) {
    let { value, name } = e.target;
    setValue((rest) => ({ ...rest, [name]: value }));
  }
  async function submitData(e) {
    e.preventDefault();
    setValue((rest) => ({ ...rest, isLoaded: false }));
    let password = {
      newPassword: getValue.newPassword,
      confirmNewPassword: getValue.confirmNewPassword,
    };
    const { message, status } = await SET_PASSWORD(password);
    console.log({ message, status });
    status !== 200
      ? setValue((rest) => ({
          ...rest,
          error: { message, status },
          isLoaded: true,
        }))
      : setValue((rest) => ({
          ...rest,
          newPassword: "",
          confirmNewPassword: "",
          error: {},
          isLoaded: true,
        }));
  }

  return (
    <div className="login-container">
      <div id="info-container">
        <h1>HelloApp</h1>
        <form onSubmit={submitData}>
          <div className="input-container">
            <input
              type="password"
              name="newPassword"
              className={
                getValue.error.status === 401
                  ? "userInfo sign-input formError"
                  : "userInfo  sign-input"
              }
              value={getValue.password}
              onChange={handleChange}
              placeholder="Enter New Password"
              required
              autoComplete=""
            />
            <br />

            <input
              type="password"
              name="confirmNewPassword"
              className={
                getValue.error.status === 401
                  ? "userInfo sign-input formError"
                  : "userInfo  sign-input"
              }
              value={getValue.password}
              onChange={handleChange}
              placeholder="Re-enter New Password"
              required
              autoComplete=""
            />

            <div className="errors">
              {getValue.error.status ? (
                <span>
                  <i className="fas fa-exclamation-circle"></i>{" "}
                  {getValue.error.message}
                </span>
              ) : (
                ""
              )}
            </div>
          </div>

          {!getValue.isLoaded ? (
            <Spinner />
          ) : (
            <input
              type="submit"
              value="Submit"
              className="submit-form sign-input"
            />
          )}
        </form>
      </div>
    </div>
  );
}
