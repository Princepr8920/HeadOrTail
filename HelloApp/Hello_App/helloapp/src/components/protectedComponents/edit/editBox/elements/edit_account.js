import React, { useState } from "react";
import "./account.scss";
import useAuth from "../../../../../hooks/usefulHooks/useAuth";
import useUpdate from "../../../../../hooks/usefulHooks/useUpdate";
import Ellipsis from "../../../../reuseableComponents/loadingComponents/ellipsis";
import ERROR from "../../../../reuseableComponents/informativeComponents/ERROR";
import useEditRequest from "../../../../../hooks/componentHooks/editorHooks/editRequestHook";
import useView from "../../../../../hooks/usefulHooks/useView";
import Info from "../../../../reuseableComponents/informativeComponents/INFO";

export default function Account() {
  const { setView, view } = useView();
  const SUBMIT_DATA = useEditRequest();

  const {
    auth: { user },
  } = useAuth();
  const UPDATED_FIELDS = useUpdate();

  const [input, setInput] = useState({
    username: user.username,
    email: user.email,
  });

  const { username, email } = input;

  function handleChange(e) {
    e.preventDefault();
    const { name, value } = e.target;
    setInput((rest) => ({ ...rest, [name]: value }));
    setView((rest) => ({ ...rest, error: null }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setView((rest) => ({ ...rest, isLoaded: false }));
    const { message, status, success } = await SUBMIT_DATA({
      userID: user.userID,
      update: UPDATED_FIELDS(input, user),
    }); 
    if (status === 200) {
      setView((rest) => ({ ...rest, edit_operation: { success, message } }));
    } else if (status === 202) {
      setView((rest) => ({
        ...rest,
        verification: { isVerified: false, message: message },
      }));
    } else {
      setView((rest) => ({
        ...rest,
        error: { status, message },
        isLoaded: true,
      }));
    }
    return setView((rest) => ({ ...rest, isLoaded: true }));
  }

  return (
    <>
      <form onSubmit={handleSubmit} className="edit_form">
        <div className="edit_inputs">
          <label htmlFor="edit_username">Username</label>
          <input
            type="input"
            id="edit_username"
            className=""
            name="username"
            placeholder="Username"
            value={username}
            onChange={handleChange}
            aria-label="Username"
            aria-describedby="addon-wrapping"
          />
        </div>
        <div className="edit_inputs">
          <label htmlFor="edit_email">Email</label>
          <input
            id="edit_email"
            type="email"
            name="email"
            placeholder="Email"
            aria-label="Username"
            value={email}
            onChange={handleChange}
            aria-describedby="addon-wrapping"
          />
        </div>

        {UPDATED_FIELDS(input, user).hasOwnProperty("email") ? (
          <Info info="A verification code will be sent to this email address." />
        ) : (
          <ERROR error={view.error} />
        )}

        {Object.keys(UPDATED_FIELDS(input, user)).length !== 0 ? (
          <div className="save_edit_button">
            {!view.isLoaded ? (
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
