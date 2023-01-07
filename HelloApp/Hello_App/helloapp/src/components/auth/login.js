import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import useLogin from "../../hooks/componentHooks/loginHook";
import Ellipsis from "../usefulComponents/loadingComponents/ellipsis";
import "./login&signupCss.scss";
import ERROR from "../usefulComponents/informativeComponents/ERROR";

export default function Login() {
  const SUBMIT_DATA = useLogin(),
    [getValue, setValue] = useState({
      email: "",
      password: "",
      error: null,
      isLoaded: true,
    });

  const { email, password, error, isLoaded } = getValue;

  function handleChange(e) {
    const { name, value } = e.target;
    setValue((rest) => ({ ...rest, [name]: value, error: null }));
  }

  async function submitData(e) {
    e.preventDefault();
    setValue((rest) => ({ ...rest, isLoaded: false }));
    const { message, status } = await SUBMIT_DATA({ email, password });
    status !== 200 && status !== 202
      ? setValue((rest) => ({
          ...rest,
          error: { message, status },
          isLoaded: true,
        }))
      : setValue((rest) => ({
          ...rest,
          email: "",
          password: "",
          error: null,
          isLoaded: true,
        }));
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
                  error && error.status === 404
                    ? "userInfo  sign-input formError"
                    : "userInfo  sign-input"
                }
                name="email"
                value={email}
                onChange={handleChange}
                placeholder="Email"
                required
              />
            </div>
          </div>
          <div key="password" className="input-container">
            <input
              type="password"
              name="password"
              className={
                error && error.status === 401
                  ? "userInfo sign-input formError"
                  : "userInfo  sign-input"
              }
              value={password}
              onChange={handleChange}
              placeholder="Password"
              required
            />

            <ERROR error={error} />
          </div>
          {!isLoaded ? (
            <Ellipsis />
          ) : (
            <input
              type="submit"
              value="Login"
              className="submit-form sign-input"
            />
          )}
        </form>

        {error && error.status === 401 ? (
          <div id="forgot">
            <Link to="/password/recovery">Forgot Password ?</Link>
          </div>
        ) : (
          ""
        )}

        {isLoaded ? (
          <div className="social">
            <Link to="/signup" className="submit-form sign-input local" replace>
              Signup
            </Link>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}
