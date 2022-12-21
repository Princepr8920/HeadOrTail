import React from "react";
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import usePostHook from "../../hooks/usePostHook";

export default function SetPassword() {
  const POST = usePostHook();
  let { setAuth } = useAuth();
  let params = useParams();
  let navigate = useNavigate();
  let { id, token } = params;

  let [getValue, setValue] = useState({
    newPassword: "",
    confirmNewPassword: "",
    error: {},
  });

  function handleChange(e, name) {
    let value = e.target.value;
    setValue((rest) => ({ ...rest, [name]: value }));
  }
  async function submitData(e) {
    e.preventDefault();
    let info = {
      newPassword: getValue.newPassword,
      confirmNewPassword: getValue.confirmNewPassword,
    };
    let response = await POST(
      info,
      `user/${id}/password/setnewpassword/${token}`
    );
    if (response.data.error) {
      let { message, status } = response.data.error;
      setValue((rest) => ({
        ...rest,
        error: {
          message: message,
          status: status,
        },
      }));
    } else {
      setAuth(response.data);
      navigate("/success", { replace: true });
    }
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
              onChange={(e) => handleChange(e, "newPassword")}
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
              onChange={(e) => handleChange(e, "confirmNewPassword")}
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
