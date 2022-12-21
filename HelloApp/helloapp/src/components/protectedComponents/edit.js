import React, { useState } from "react";
import "./edit.scss";
import "./verifyUser.scss"; 

import axios from "../../api/axios";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import usePostHook from "../../hooks/usePostHook";

 

export default function EDIT() {
  const POST = usePostHook();
  let {
    auth: { user },
  } = useAuth();

  let [getInput, setInput] = useState({
    username: user.username,
    email: user.email,
    bio: user.bio,
    last_name: user.last_name,
    picture: user.picture,
    first_name: user.first_name,
    userID: user.userID,
  });
  let [getValue, setValue] = useState({
    validation_response: {
      success: false,
      status: 100,
      message: "Click on verify button to verify your new email.",
    },
    verification_Input: "",
  });

  let { username, email, bio, picture, first_name, last_name, userID } =
    getInput;
  let {
    validation_response: { success, status, message },
    verification_Input,
  } = getValue;

  function handleChange(e) {
    let { name, value } = e.target;
    let inputs = ["username", "email", "bio", "first_name", "last_name"];
    inputs.forEach((input) => {
      setInput((rest) => ({
        ...rest,
        [input]: name === input ? value : getInput[input],
      }));
    });
  }

 
  function updatedFields() {
    let updated = {};
    for (let obj in getInput) {
      if (user[obj] !== getInput[obj]) {
        updated[obj] = getInput[obj] !== "" ? getInput[obj] : "";
      }
    }
    return updated;
  }

  

  async function submitData(e) {
    e.preventDefault();
    let url = "/user/profile/edit";
    let info = JSON.stringify({ userID, update: updatedFields() });
    let option = {
      withCredentials: true,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8",
      },
    };

    try {
      let updated = await axios.patch(url, info, option);
      return updated;
    } catch (err) {
      console.error(err);
      const error = err.response.data.error;
      return setValue((rest) => ({ ...rest, error: error }));
    }
  }

  async function Verify_Email(e) {
    e.preventDefault();
    let email = updatedFields().hasOwnProperty("email")
      ? updatedFields().email
      : "";
    let info = { userID, email };
    const response = await POST(info, "user/verify/email");
    setValue((rest) => ({
      ...rest,
      validation_response: {
        success: response?.data.success,
        status: response?.data?.status,
        message: response?.data?.message,
      },
    }));
  }
  console.log(getValue.validation_response);

  async function submit_Verification_Code(e) {
    e.preventDefault();
    let data = { code: getValue?.verification_Input };
    let response = await POST(data, "user/email/verification/done");
    console.log(response);
    setValue((rest) => ({
      ...rest,
      validation_response: {
        success: response?.data?.success,
        status: response?.data?.status,
        message: response?.data?.message,
      },
    }));
  }

  function verification_status() {
    const res = status;
    switch (res) {
      case 202:
      case 200:
        return ["green","fa-sharp fa-solid fa-check"];
      case 500:
      case 401:
        return ["red","fa-solid fa-xmark"];
      default:
        return ["blue","fas fa-exclamation-circle"];
    }
  }

  console.log(verification_status());

  return (
    <>
      <section id="edit_Section">
        
        <div className="img_div">
          <div className="edit_profile_img_div">
            <label htmlFor="file-input">
              <img className="edit_profile_img" src={picture} alt="" />
              <div className="overlay">
                <i className="fa fa-camera" aria-hidden="true"></i>
                <p>Change Profile Picture</p>
              </div>
            </label>
            <input id="file-input" type="file" />
          </div>
        </div>

        <form id="edit_form" onSubmit={submitData}>
          <div className="firstAndlast">
            <div className="edit_inputs">
              <label htmlFor="edit_firstName">First Name</label>
              <input
                id="edit_firstName"
                type="input"
                className=""
                name="first_name"
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
                name="last_name"
                placeholder="Last Name"
                aria-label="Username"
                value={last_name}
                onChange={handleChange}
                aria-describedby="addon-wrapping"
              />
            </div>
          </div>
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
              className=""
              name="email"
              placeholder="Email"
              aria-label="Username"
              value={email}
              onChange={handleChange}
              aria-describedby="addon-wrapping"
            />
          </div>

          <div
            style={
              updatedFields().hasOwnProperty("email")
                ? { display: "flex" }
                : { display: "none" }
            }
            className="verifyOrError"
          >
            <div
              style={{ color: verification_status()[0]}}
              className="errors errorsInEdit"
            >
              <span>
              <i className={verification_status()[1]}></i>
                {message}
              </span>
            </div>

            <div
              style={
                status === 401 || status === 400 || status === 200
                  ? { visibility: "visible" }
                  : { visibility: "hidden" }
              }
              className="verifyEmail_div"
            >
              <div className="verify_email verify_email_in_edit">
                <input
                  className={
                    status === 401
                      ? "verificaion-input formError"
                      : "verificaion-input"
                  }
                  type="input"
                  name="code"
                  value={verification_Input}
                  onChange={(e) =>
                    /(^[0-9]*$)/.test(e.target.value)
                      ? setValue((rest) => ({
                          ...rest,
                          verification_Input: e.target.value,
                          validation_response: {
                            success: false,
                            status: 400,
                            message: "Enter verification code",
                          },
                        }))
                      : ""
                  }
                  maxLength="6"
                  required
                />
              </div>

              <div className="verify-btn">
                <button
                  onClick={submit_Verification_Code}
                  type="button"
                  className="btn btn-success"
                >
                  Submit
                </button>
              </div>
            </div>

            <div
              style={
                status !== 202
                  ? { visibility: "visible" }
                  : { visibility: "hidden" }
              }
            >
              <button
                onClick={Verify_Email}
                type="button"
                className="btn btn-dark"
              >
                Verify
              </button>
            </div>
          </div>

          <div className="edit_inputs">
            <label htmlFor="edit_Bio">Bio</label>
            <textarea
              id="edit_Bio"
              className=""
              value={bio !== "bio not avilable" ? bio : ""}
              onChange={handleChange}
              placeholder={
                bio === "bio not avilable" ? bio : "Write something about you"
              }
              name="bio"
              // id="floatingTextarea"
            ></textarea>
          </div>
          <div className="submit">
            <input type="submit" className="btn btn-outline-dark" />
          </div>
        </form>
      </section>
    </>
  );
}
