import React from "react";
import { useState } from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";
import usePostHook from "../../hooks/usePostHook";
import useAuth from "../../hooks/useAuth";

export default function Account() {
  const POST = usePostHook();
  const { setAuth } = useAuth();

  const [getValue, setValue] = useState({
    email: "",
    password: "",
    error: {},
  });

  const { email, password } = getValue;

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  function handleChange(e, name) {
    const value = e.target.value;
    setValue((rest) => ({ ...rest, [name]: value, error: {} }));
  }

  async function submitData(e) {
    e.preventDefault();
    const info = { email, password };
    const response = await POST(info, "login");
    if (response.data.error) {
      const { message, status } = response.data.error;
     return setValue((rest) => ({
        ...rest,
        error: {
          message: message,
          status: status,
        },
      }));
    } else {
      if (response?.status === 202) {
        setAuth(response.data);
        navigate("/verify/user/account", { replace: true });
      } else if (response?.data?.user) {
        const { user, accessToken } = response?.data;
        setAuth({ user, accessToken });
        navigate(from, { replace: true });
      }
      return setValue((rest) => ({
        ...rest,
        email: "",
        password: ""
      }));
    }
  }

  return (
    <div className="login-container">
      <div id="info-container">
        <h1>HelloApp</h1>
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
                value={email}
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
          <div key="password" className="input-container">
            <input
              type="password"
              name="password"
              className={
                getValue.error.status === 401
                  ? "userInfo sign-input formError"
                  : "userInfo  sign-input"
              }
              value={password}
              onChange={(e) => handleChange(e, "password")}
              placeholder="Password"
              required
              autoComplete=""
            />
            <div className="errors">
              {getValue.error.status === 401 ? (
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
            value="Login"
            className="submit-form sign-input"
          />
        </form>

        {getValue.error.status === 401 ? <div id="forgot">
          <Link to="/password/recovery">Forgot Password ?</Link>
        </div>: "" }

        <div className="social">
          <Link to="/signup" className="submit-form sign-input local" replace>
            Signup
          </Link>
        </div>
      </div>
    </div>
  );
}
