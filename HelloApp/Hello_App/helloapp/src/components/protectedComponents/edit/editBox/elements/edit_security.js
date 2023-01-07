import React, { useState } from "react";
import "./security.scss";
import useEditRequest from "../../../../../hooks/componentHooks/editorHooks/editRequestHook";
import useAuth from "../../../../../hooks/usefulHooks/useAuth";
import useUpdate from "../../../../../hooks/usefulHooks/useUpdate";
import useView from "../../../../../hooks/usefulHooks/useView";
import ERROR from "../../../../usefulComponents/informativeComponents/ERROR";
import Ellipsis from "../../../../usefulComponents/loadingComponents/ellipsis";

export default function Security() {
  const SUBMIT_DATA = useEditRequest();
  const UPDATED_FIELDS = useUpdate();
  const {
    setView,
    view: { error, isLoaded },
  } = useView();
  const {
    auth: { user },
  } = useAuth();

  const [input, setInput] = useState({
    current_password: "",
    new_password: "",
    confirm_password: "",
  });

  const [isActive, setActive] = useState({
    two_step_verification: user.security.two_step_verification,
    login_notification: user.security.login_notification,
  });

  const [item, setItem] = useState({
    showPassword: false,
    isCollapsed: true,
  });

  const isUpdated = {
    ...trackChanges(input),
    security: UPDATED_FIELDS(isActive, user.security),
  };

  let { two_step_verification, login_notification } = isActive;

  function handleToggle(e) {
    let id = e.target.id;
    setActive((rest) => ({ ...rest, [id]: !isActive[id] }));
  }
  function expendAndCollapse() {
    setItem((rest) => ({ ...rest, isCollapsed: !item.isCollapsed }));
  }
  function password_visibility() {
    setItem((rest) => ({ ...rest, showPassword: !item.showPassword }));
  }

  function handleChange(e) {
    e.preventDefault();
    const { name, value } = e.target;
    setInput((rest) => ({ ...rest, [name]: value }));
    setView((rest) => ({ ...rest, error: { inputError: null, otherError: null } }));
  }

  function trackChanges(changes) {
    const changed = {};
    for (let key in changes) {
      if (changes[key] !== "") {
        changed[key] = changes[key];
      }
    }
    return changed;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setView((rest) => ({ ...rest, isLoaded: false }));
    const { data, status } = await SUBMIT_DATA(isUpdated);
    if (status === 200) {
      const { success, message } = data;
      setView((rest) => ({
        ...rest,
        edit_operation: { success, message },
        isLoaded: true,
      }));
    } else {
      setView((rest) => ({
        ...rest,
        error: {
          inputError: data?.inputError,
          otherError:
            status !== 400 ? { message: data?.message, status } : null,
        },
        isLoaded: true,
      }));
    }
    return setView((rest) => ({ ...rest, isLoaded: true }));
  }

  const showPassword = item.showPassword ? ["ON", "text"] : ["OFF", "password"];
  const setCollapsed = item.isCollapsed
    ? ["item_collapsed", "fa-solid fa-angle-down"]
    : ["item_expended", "fa-solid fa-angle-up"];

  return (
    <>
      <form onSubmit={handleSubmit} className="edit_form">
        <div className={setCollapsed[0]} id="change_password">
          <button
            type="button"
            onClick={expendAndCollapse}
            className="wide-list-btn"
          >
            <span className="span-flex">
              I want to change my password
              <i className={setCollapsed[1]}></i>
            </span>
          </button>

          <div className="change_password_form edit_form">
            <div className="edit_inputs">
              <label htmlFor="current_password">Current Password</label>
              <input
                type={showPassword[1]}
                id="current_password"
                name="current_password"
                placeholder="Enter your current password"
                value={input.current_password}
                onChange={handleChange}
                aria-label="Username"
                aria-describedby="addon-wrapping"
              />
              <ERROR error={error?.inputError?.current_password} />
            </div>
            <div className="edit_inputs">
              <label htmlFor="new_password">New Password</label>
              <input
                id="new_password"
                type={showPassword[1]}
                name="new_password"
                placeholder="Enter your new password"
                aria-label="Username"
                value={input.new_password}
                onChange={handleChange}
                aria-describedby="addon-wrapping"
              />
              <ERROR error={error?.inputError?.new_password} />
            </div>

            <div className="edit_inputs">
              <label htmlFor="confirm_password">Confirm Password</label>
              <input
                id="confirm_password"
                type={showPassword[1]}
                name="confirm_password"
                placeholder="re-enter your new password"
                aria-label="Username"
                value={input.confirm_password}
                onChange={handleChange}
                aria-describedby="addon-wrapping"
              />
              <ERROR error={error?.inputError?.confirm_password} />
            </div>
            <div id="show_password">
              <span onClick={password_visibility} id="show_pwd-btn">
                <span>Password visibility </span> <span>{showPassword[0]}</span>
              </span>
            </div>
          </div>
        </div>
        <div className="security_options">
          <ul>
            <li>
              <button
                type="button"
                id="two_step_verification"
                className="wide-list-btn"
                onClick={handleToggle}
              >
                <span className="span-flex">
                  Two step verification
                  <span
                    className={
                      two_step_verification ? "activated" : "deactivated"
                    }
                  >
                    {two_step_verification ? "Activated" : "Deactivated"}
                  </span>
                </span>
              </button>
            </li>
            <li>
              <button
                type="button"
                id="login_notification"
                className="wide-list-btn"
                onClick={handleToggle}
              >
                <span className="span-flex">
                  Login notification
                  <span
                    className={login_notification ? "activated" : "deactivated"}
                  >
                    {login_notification ? "Activated" : "Deactivated"}
                  </span>
                </span>
              </button>
            </li>
          </ul>
        </div>

        <ERROR error={error?.otherError} />

        {Object.keys({ ...isUpdated.security, ...trackChanges(input) })
          .length !== 0 ? (
          <div className="save_edit_button">
            {!isLoaded ? (
              <Ellipsis />
            ) : (
              <input
                type="submit"
                value="Save changes"
                className="btn btn-dark"
              />
            )}
          </div>
        ) : (
          ""
        )}
      </form>
    </>
  );
}
