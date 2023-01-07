import React, { useState } from "react";
import "./edit.scss";
import { Link } from "react-router-dom";
import useAuth from "../../../hooks/usefulHooks/useAuth";
import useTheme from "../../../hooks/usefulHooks/useTheme";
import Editor_Box from "./editBox/editor_box";
import useView from "../../../hooks/usefulHooks/useView";
import Header from "../reuseableComponents/header";

export default function EDIT() {
  const { setView } = useView();
  const {
    theme: {
      theme_profile: { components_background },
    },
  } = useTheme();

  let {
    auth: {
      user: {
        username,
        first_name,
        last_name,
        email,
        bio,
        status,
        date_of_birth,
        picture,
      },
    },
  } = useAuth();

  let [getItem, setItem] = useState({
    isEditable: false,
    editableItem: "none",
  });

  function enableEdit(e) {
    e.stopPropagation();
    let { id } = e.target;
    let fields = [
      { name: "Personal Information" },
      { name: "Account" },
      { name: "Security" },
      { name: "Prefrences" },
      { name: "Timeline" },
      { name: "Tasks" },
      { name: "Danger-Zone" },
    ];
    setItem((rest) => ({ ...rest, isEditable: !getItem.isEditable }));
    for (let i = 0, len = fields.length; i < len; i++) {
      if (fields[i]["name"] === id) {
        setItem((rest) => ({ ...rest, editableItem: fields[i]["name"] }));
        break;
      } else {
        setItem((rest) => ({ ...rest, editableItem: "none" }));
        setView((rest) => ({
          ...rest,
          edit_operation: { success: false, message: "" },
          verification: { isVerified: true, message: "" },
          waiting: false,
          error:{inputError:null,otherError:null}
        }));
      }
    }
  }

  return (
    <>
      <section
        className={`edit_Section ${getItem.isEditable ? `edit_Enabled` : ""}`}
      >
        <Header name={"My Account"} link={true} />

        <div id="edit_container">
          <div className="grid_1">
            <div
              onClick={enableEdit}
              id="Personal Information"
              className={`grid-cells check_full_profile ${components_background}`}
            >
              <div className="edit_profile_img_div">
                <label htmlFor="file-input">
                  <img
                    className="edit_profile_img"
                    src={picture}
                    alt="user_dp"
                  />
                  <div className="overlay">
                    <i className="fa fa-camera" aria-hidden="true"></i>
                    <span>Change Profile Picture</span>
                  </div>
                </label>
                <input id="file-input" type="file" />
              </div>

              <div className="edit_personal_info">
                <div className="cells_header">
                  <h5>Personal Information</h5>
                  <img
                    src={require("../../../assets/icons/Personal information.png")}
                    alt="personal_icon"
                  />
                </div>
                <div className="info_for_edit">
                  <h4>
                    {first_name} {last_name}
                  </h4>
                  <h5>{new Date(date_of_birth).toDateString()}</h5>
                  <span className={`status ${components_background}`}>
                    🎴 {status}
                  </span>
                  <p className="bio">{bio}</p>
                </div>
              </div>
            </div>

            <div
              id="Account"
              onClick={enableEdit}
              className={`grid-cells edit_email_username ${components_background}`}
            >
              <div className="cells_header">
                <h5>Account</h5>
                <img
                  src={require("../../../assets/icons/account.png")}
                  alt="account_icon"
                />
              </div>
              <div className="info_for_edit">
                <h5>{username}</h5>
                <h5>{email}</h5>
              </div>
            </div>

            <div
              id="Security"
              onClick={enableEdit}
              className={`grid-cells edit_security ${components_background}`}
            >
              {" "}
              <div className="cells_header">
                <h5>Security</h5>
                <img
                  src={require("../../../assets/icons/security.png")}
                  alt="security_icon"
                />
              </div>
              <div className="info_for_edit">
                <h5>Change your password</h5>
                <h5>Two-step verification</h5>
              </div>
            </div>
          </div>

          <div className="grid_2">
            <div
              id="Prefrences"
              onClick={enableEdit}
              className={`grid-cells edit_prefrences ${components_background}`}
            >
              <div className="cells_header">
                <h5>Preferences</h5>
                <img
                  src={require("../../../assets/icons/prefrences.png")}
                  alt="prefrences_icon"
                />
              </div>

              <div className="info_for_edit">
                <h5>Dark-Mode</h5>
                <h5>Theme</h5>
                <h5>Notification</h5>
              </div>
            </div>

            <div
              id="Timeline"
              onClick={enableEdit}
              className={`grid-cells edit_timeline ${components_background}`}
            >
              <div className="cells_header">
                <h5>Timeline</h5>
                <img
                  src={require("../../../assets/icons/timeline.png")}
                  alt="timeline_icon"
                />
              </div>
              <div className="info_for_edit">
                <h5>last posted a photo</h5>
                <h5>your liked this photo</h5>
                <h5>you comment to this story</h5>
              </div>
            </div>

            <div
              id="Tasks"
              onClick={enableEdit}
              className={`grid-cells edit_tasks ${components_background}`}
            >
              <div className="cells_header">
                <h5>Tasks</h5>
                <img
                  src={require("../../../assets/icons/tasks.png")}
                  alt="tasks_icon"
                />
              </div>
              <div className="info_for_edit">
                <ul>
                  <li>add task</li>
                  <li>delete task</li>
                </ul>
              </div>
            </div>

            <div
              id="Danger-Zone"
              onClick={enableEdit}
              className={`grid-cells danger_zone ${components_background}`}
            >
              <div className="cells_header">
                <h5>Danger-Zone</h5>{" "}
                <img
                  src={require("../../../assets/icons/danger.png")}
                  alt="danger_icon"
                />
              </div>
              <div className="info_for_edit">
                <ul>
                  <li>Temporarily deactivate my account</li>
                  <li>Permanantly delete account</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
      {getItem.isEditable ? (
        <div className="edit_view_box">
          <Editor_Box
            disableEdit={enableEdit}
            FieldName={getItem.editableItem}
          />
        </div>
      ) : (
        ""
      )}
    </>
  );
}
