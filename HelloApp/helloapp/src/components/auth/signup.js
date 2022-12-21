import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import usePostHook from "../../hooks/usePostHook";
import useAuth from "../../hooks/useAuth";

export default function Signup() {
  const POST = usePostHook(); 
  const navigate = useNavigate();
  const { setAuth } = useAuth();
  const [getValue, setValue] = useState({
    email: "",
    password: "",
    username: "",
    first_name: "",
    last_name: "",
    error: {},
  });

  const { email, password, username, first_name, last_name } = getValue;

 

  function handleChange(e, name) {
    const value = e.target.value;
    setValue((rest) => ({ ...rest, [name]: value, error: {} }));
  }

  async function submitData(e) {
    e.preventDefault();
    const info = { email, password, username, first_name, last_name };
    const response = await POST(info, "signup");
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
      setAuth(response.data);
      setValue((rest) => ({
        ...rest,
        email: "",
        password: "",
        username: "",
        first_name: "",
        last_name: "",
      }));
      return navigate("/verify/user/account", { replace: true });
    }
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
                onChange={(e) => handleChange(e, "first_name")}
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
                onChange={(e) => handleChange(e, "last_name")}
                placeholder="Last name"
                maxLength="30"
              />
            </div>
            <div key="email" className="input-container">
              <input
                type="email"
                className={
                  (getValue.error.status === 409 &&
                    getValue.error.message !==
                      "That username is taken. Try another") ||
                  getValue.error.status === 404
                    ? "userInfo sign-input formError"
                    : "userInfo sign-input"
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
            <div key="username" className="input-container">
              <input
                type="input"
                className={
                  getValue.error.status === 409 &&
                  getValue.error.message !== "Email already registered"
                    ? "userInfo sign-input formError"
                    : "userInfo sign-input"
                }
                name="username"
                value={username}
                onChange={(e) => handleChange(e, "username")}
                placeholder="Username"
                maxLength="30"
                required
              />
              <div className="errors">
                {getValue.error.status === 409 &&
                getValue.error.message !== "Email already registered" ? (
                  <span>
                    <i className="fas fa-exclamation-circle"></i>{" "}
                    {getValue.error.message}
                  </span>
                ) : (
                  ""
                )}
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
          </div>
          <input
            type="submit"
            value="Signup"
            className="submit-form sign-input"
          />
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
