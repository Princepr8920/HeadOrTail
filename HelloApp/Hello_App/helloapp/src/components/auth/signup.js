import { useState } from "react";
import { Link } from "react-router-dom";
import useSignup from "../../hooks/componentHooks/signupHook";
import ERROR from "../usefulComponents/informativeComponents/ERROR";
import Ellipsis from "../usefulComponents/loadingComponents/ellipsis";
import "./login&signupCss.scss";

export default function Signup() {
  const SUBMIT_DATA = useSignup();
  const [getValue, setValue] = useState({
    email: "",
    password: "",
    confirm_password: "",
    username: "",
    first_name: "",
    last_name: "",
    error: { inputError: null, otherError: null },
    isLoaded: true, 
  });

  const {
    email,
    password,
    username,
    first_name,
    last_name,
    confirm_password,
    isLoaded, 
    error,
  } = getValue;

  function handleChange(e) {
    const { value, name } = e.target;
    setValue((rest) => ({ ...rest, [name]: value, error: null }));
  }

  async function submitData(e) {
    e.preventDefault();
    setValue((rest) => ({ ...rest, isLoaded: false,   }));
    const { status, data } = await SUBMIT_DATA({
      email,
      password,
      username,
      first_name,
      last_name,
      confirm_password,
    });
    status !== 202
      ? setValue((rest) => ({
          ...rest,
          error: {
            inputError: data?.inputError,
            otherError:
              status !== 400 ? { message: data?.message, status } : null,
          },
          isLoaded: true, 
        }))
      : setValue((rest) => ({
          ...rest,
          email: "",
          password: "",
          username: "",
          first_name: "",
          last_name: "",
          confirm_password: "",
          error: { inputError: null, otherError: null },
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
            <ERROR error={error?.inputError?.first_name} />
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
            <ERROR error={error?.inputError?.last_name} />
            <div key="email" className="input-container">
              <input
                type="email"
                className={"userInfo sign-input"}
                name="email"
                value={email}
                onChange={handleChange}
                placeholder="Email"
                required
              />
            </div>
            <ERROR error={error?.inputError?.email} />
            <div key="username" className="input-container">
              <input
                type="input"
                className={"userInfo sign-input"}
                name="username"
                value={username}
                onChange={handleChange}
                placeholder="Username"
                maxLength="30"
                required
              />
            </div>
            <ERROR error={error?.inputError?.username} />
            <div key="password" className="input-container">
              <input
                type="text"
                name="password"
                className={"userInfo  sign-input"}
                value={password}
                onChange={handleChange}
                placeholder="Password"
                required
              />
            </div>
            <ERROR error={error?.inputError?.password} />
            <div key="confirmPassword" className="input-container">
              <input
                type="text"
                name="confirm_password"
                className={"userInfo  sign-input"}
                value={confirm_password}
                onChange={handleChange}
                placeholder="Re-enter your Password"
                required
              />
            </div>
            <ERROR error={error?.inputError?.confirm_password} />
          </div>
          <ERROR error={error?.otherError} />
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

        {isLoaded ? (
          <div className="social">
            <Link to="/login" className="submit-form sign-input local" replace>
              Login
            </Link>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}
