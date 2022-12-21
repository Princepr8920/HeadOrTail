import { useState } from "react";
import { Link } from "react-router-dom";
import useSignup from "../../hooks/componentHooks/signupHook";
import ERROR from "../reuseableComponents/informativeComponents/ERROR";
import Ellipsis from "../reuseableComponents/loadingComponents/ellipsis";

import "./login&signupCss.scss";

export default function Signup() {
  const SUBMIT_DATA = useSignup();
  const [getValue, setValue] = useState({
    email: "",
    password: "",
    username: "",
    first_name: "",
    last_name: "",
    error: null,
    isLoaded: true,
  });

  const { email, password, username, first_name, last_name, isLoaded, error } =
    getValue;

  function handleChange(e) {
    const { value, name } = e.target;
    setValue((rest) => ({ ...rest, [name]: value, error: null }));
  }

  async function submitData(e) {
    e.preventDefault();
    setValue((rest) => ({ ...rest, isLoaded: false }));
    const { message, status } = await SUBMIT_DATA({
      email,
      password,
      username,
      first_name,
      last_name,
    });
    status !== 202
      ? setValue((rest) => ({
          ...rest,
          error: { message, status },
          isLoaded: true,
        }))
      : setValue((rest) => ({
          ...rest,
          email: "",
          password: "",
          username: "",
          first_name: "",
          last_name: "",
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
            <div key="firstName" className="input-container">
              <input
                type="input"
                className="username sign-input"
                name="first_name"
                value={first_name}
                onChange={handleChange}
                placeholder="First name"
                maxLength="30"
                required
              />
            </div>
            <div key="lastName" className="input-container">
              <input
                type="input"
                className="username sign-input"
                name="last_name"
                value={last_name}
                onChange={handleChange}
                placeholder="Last name"
                maxLength="30"
              />
            </div>
            <div key="email" className="input-container">
              <input
                type="email"
                className={
                  error &&
                  error.status === 409 &&
                  error.message !== "That username is taken. Try another"
                    ? "userInfo sign-input formError"
                    : "userInfo sign-input"
                }
                name="email"
                value={email}
                onChange={handleChange}
                placeholder="Email"
                required
              />
            </div>
            <div key="username" className="input-container">
              <input
                type="input"
                className={
                  error &&
                  error.status === 409 &&
                  error.message !== "Email already registered"
                    ? "userInfo sign-input formError"
                    : "userInfo sign-input"
                }
                name="username"
                value={username}
                onChange={handleChange}
                placeholder="Username"
                maxLength="30"
                required
              />
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
                autoComplete=""
              />
            </div>
          </div>{" "}
         <ERROR error={error} />  
          {!isLoaded ? (
            <Ellipsis />
          ) : (
            <input
              type="submit"
              value="Signup"
              className="submit-form sign-input"
            />
          )}
        </form>

        <div className="social">
          <Link to="/login" className="submit-form sign-input local" replace>
            Login
          </Link>
        </div>
      </div>
    </div>
  );
}
