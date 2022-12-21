import React, { useState } from "react";
import useAuth from "../../../../../hooks/usefulHooks/useAuth";
import Ellipsis from "../../../../reuseableComponents/loadingComponents/ellipsis";
import useView from "../../../../../hooks/usefulHooks/useView";
import useEditRequest from "../../../../../hooks/componentHooks/editorHooks/editRequestHook";
import useUpdate from "../../../../../hooks/usefulHooks/useUpdate";
import ERROR from "../../../../reuseableComponents/informativeComponents/ERROR";

export default function Personal_Info() {
  const {
    auth: { user },
  } = useAuth();
  const SUBMIT_DATA = useEditRequest();
  const UPDATED_FIELDS = useUpdate();
  const {view, setView } = useView();

  const [input, setInput] = useState({
    first_name: user.first_name,
    last_name: user.last_name,
    bio: user.bio,
    date_of_birth: user.date_of_birth,
    status: user.status,
  });

 
  const { first_name, last_name, bio, date_of_birth, status } = input;

  function handleChange(e) {
    const { name, value } = e.target;
    setInput((rest) => ({ ...rest, [name]: value }));
    setView((rest) => ({ ...rest, error: null }));
  }

  async function submitData(e) {
    e.preventDefault();
    setView((rest) => ({ ...rest, isLoaded: false }));
    const { message, status, success } = await SUBMIT_DATA({
      userID: user.userID,
      update: UPDATED_FIELDS(input, user),
    });
    if (status === 200) {
      setView((rest) => ({ ...rest, edit_operation: { success, message } }));
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
      <form onSubmit={submitData} className="edit_form">
        <div className="edit_inputs">
          <label htmlFor="edit_firstName">First Name</label>
          <input
            id="edit_firstName"
            type="input"
            className=""
            name="first_name"
            maxLength={20}
            placeholder="First Name"
            aria-label="Username"
            value={first_name}
            onChange={handleChange}
            aria-describedby="addon-wrapping"
          />
        </div>
        <div className="edit_inputs">
          <label htmlFor="edit_lastName">Last Name</label>
          <input
            id="edit_lastName"
            type="input"
            className=""
            maxLength={20}
            name="last_name"
            placeholder="Last Name"
            aria-label="Username"
            value={last_name}
            onChange={handleChange}
            aria-describedby="addon-wrapping"
          />
        </div>

        <div className="edit_inputs">
          <label htmlFor="DOB">Date Of Birth</label>
          <input
            onChange={handleChange}
            type="date"
            value={new Date(date_of_birth).toISOString().split("T")[0]}
            name="date_of_birth"
            id="DOB"
          />
        </div>

        <div className="edit_inputs">
          <label htmlFor="status">Status</label>
          <input
            id="status"
            type="input"
            name="status"
            className="bio"
            maxLength={20}
            placeholder="Status"
            aria-label="Username"
            value={status}
            onChange={handleChange}
            aria-describedby="addon-wrapping"
          />
        </div>

        <div className="edit_inputs">
          <label htmlFor="edit_Bio">Bio</label>
          <textarea
            id="edit_Bio"
            value={bio !== "bio not avilable" ? bio : ""}
            onChange={handleChange}
            rows={4}
            className="bio"
            placeholder={
              bio === "bio not avilable" ? bio : "Write something about you"
            }
            name="bio"
          ></textarea>
        </div>

        <ERROR error={view.error} />

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
