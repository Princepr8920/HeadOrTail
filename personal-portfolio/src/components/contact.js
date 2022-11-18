import React, { useState } from "react";
import "./contact.scss";
import axios from "axios";

export default function Contact() {
  const [getValue, setValue] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    error: {},
    inputError: {},
    success: {},
    isLoaded: true,
  });

  function handleChange(e) {
    let { name, value } = e.target;
    let inputs = ["name", "subject", "email", "message"];
    inputs.forEach((input) => {
      setValue((rest) => ({
        ...rest,
        [input]: name === input ? value : getValue[input],
        inputError: {},
        success: {},
        isLoaded: true,
      }));
    });
  }

  function wait() {
    const timout = setTimeout(() => {
      console.log("success");
      setValue((rest) => ({
        ...rest,
        name: "",
        email: "",
        subject: "",
        message: "",
        error: {},
        success: {},
        isLoaded: true,
      }));

      clearTimeout(timout);
    }, 5000);
  }

  async function submitForm(e) {
    e.preventDefault();
    const { name, email, subject, message } = getValue;
    const json = JSON.stringify({ name, email, subject, message });
    const url = "http://localhost:2000/contact";
    let options = {
      withCredentials: true,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8",
      },
    };
    try {
      const Response = await axios.post(url, json, options);
      const res = Response?.data;
      if (res?.success) {
        setValue((rest) => ({
          ...rest,
          success: res,
        }));
      }
      return wait();
    } catch (err) {
      if (err?.response?.status === 400) {
        const inputError = err?.response?.data.errObj;
        setValue((rest) => ({
          ...rest,
          inputError: inputError,
        }));
      } else if (err.message === "Network Error") {
        console.log(err);
        setValue((rest) => ({
          ...rest,
          error: { status: 500, message: err.message + " ❌", success: false },
        }));
        return wait();
      } else {
        const { status, message, success } = err?.response?.data;
        setValue((rest) => ({
          ...rest,
          error: { status, message, success },
        }));
        return status !== 429 ? wait() : "";
      }
    }
  }

  function sent() {
    const { name, email, message } = getValue;
    if (name !== "" && email !== "" && message !== "") {
      if (!navigator.onLine) {
        setValue((rest) => ({
          ...rest,
          error: { status: 503, message: "You are offline ✈", success: false },
        }));
        return wait();
      }
      setValue((rest) => ({
        ...rest,
        error: {},
        success: {},
        inputError: {},
        isLoaded: false,
      }));
    }
  }

  return (
    <>
      <section id="contact">
        <div id="contact_div">
          <div id="contact_header">
            <h1>Contact</h1>
          </div>

          <div id="contact_items">
            <div id="client_info">
              {getValue?.error?.status !== 429 ? (
                <form onSubmit={submitForm}>
                  <div>
                    <label htmlFor="name">
                      Name<span>*</span>
                    </label>
                    <input
                      onChange={handleChange}
                      placeholder="Name"
                      id="name"
                      name="name"
                      type="text"
                      value={getValue?.name}
                      required
                    />
                    <span className="inputError">
                      {getValue?.inputError?.name
                        ? [
                            <i
                              key="name"
                              className="fa fa-exclamation-circle"
                              aria-hidden="true"
                            ></i>,
                            getValue?.inputError?.name?.msg,
                          ]
                        : ""}
                    </span>
                  </div>

                  <div>
                    <label htmlFor="email">
                      Email<span>*</span>
                    </label>
                    <input
                      onChange={handleChange}
                      value={getValue?.email}
                      placeholder="Email"
                      id="email"
                      name="email"
                      type="email"
                      required
                    />
                    <span className="inputError">
                      {getValue?.inputError?.email
                        ? [
                            <i
                              key="email"
                              className="fa fa-exclamation-circle"
                              aria-hidden="true"
                            ></i>,
                            getValue?.inputError?.email?.msg,
                          ]
                        : ""}
                    </span>
                  </div>

                  <div>
                    <label htmlFor="subject">Subject</label>
                    <input
                      onChange={handleChange}
                      value={getValue?.subject}
                      placeholder="Subject"
                      id="subject"
                      name="subject"
                      type="text"
                    />
                  </div>

                  <div>
                    <label htmlFor="message">
                      Message<span>*</span>
                    </label>
                    <textarea
                      onChange={handleChange}
                      value={getValue?.message}
                      placeholder="type your message here..."
                      name="message"
                      id="message"
                      rows="6"
                      required
                    ></textarea>
                    <span className="inputError">
                      {getValue?.inputError?.message
                        ? [
                            <i
                              key="message"
                              className="fa fa-exclamation-circle"
                              aria-hidden="true"
                            ></i>,
                            getValue?.inputError?.message?.msg,
                          ]
                        : ""}
                    </span>
                  </div>
                  <div>
                    {!getValue?.success?.success &&
                    getValue?.error?.status === undefined ? (
                      <button
                        className="btn btn-primary"
                        id="send"
                        onClick={() =>
                          getValue.inputError?.status !== 400 ? sent() : ""
                        }
                        type="submit"
                      >
                        {!getValue.isLoaded &&
                        getValue.inputError?.status !== 400
                          ? [
                              <span
                                key="spinner"
                                className="spinner-border spinner-border-sm"
                                role="status"
                                aria-hidden="true"
                              ></span>,
                              "Sending",
                            ]
                          : "Send"}
                      </button>
                    ) : getValue?.error?.status === 503 ||
                      getValue?.error?.status === 500 ? (
                      <div id="not_sent">
                        <h5>{getValue?.error?.message}</h5>
                      </div>
                    ) : (
                      <div id="sent">
                        <h5>{getValue?.success?.message}</h5>
                        <p>{getValue?.success?.info}</p>
                      </div>
                    )}
                  </div>
                </form>
              ) : (
                <div id="msg_Limit">
                  <img
                    src="https://lukaszadam.com/best-laptop-reddit.svg"
                    alt="limiter"
                  />
                  <h2>{getValue?.error?.message}</h2>
                </div>
              )}
            </div>

            <div id="my_info">
              <div id="contact_us">
                <h2>Contact me</h2>
              </div>
              <div id="my_address">
                <address>
                  <div id="myEmail">
                    <h3>
                      <i className="fas fa-envelope-square"></i>Email
                    </h3>
                    <a href="https://mail.google.com/mail/?view=cm&fs=1&to=PrincePr920@outlook.com">
                      PrincePr920@outlook.com
                    </a>
                  </div>

                  <div id="myPhone">
                    <h3>
                      <i className="fas fa-mobile-alt"></i>Phone
                    </h3>
                    <a href="tel:+917027628920">+917027628920</a>
                  </div>
                </address>
                <div id="social">
                  <a href="https://github.com/Princepr8920">
                    <i className="fa-brands fa-github"></i>Github
                  </a>
                  <a href="https://www.linkedin.com/in/prince-saini-056582201/">
                    <i className="fa-brands fa-linkedin"></i>Linkedin
                  </a>
                </div>
              </div>
              <div>
                <img
                  id="conversation"
                  src="https://lukaszadam.com/assets/downloads/javascript_illustration.svg"
                  alt="conversation_svg"
                />
                <a id="backTotop" title="Back to top" href="/#intro">
                  <i className="fas fa-arrow-circle-up"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* <svg
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMin slice"
        viewBox="24 105 156 95"
      >
        <rect x="0" y="0" width="300" height="500" fill="#E22227" />
        <path
          className="top-outer"
          fill="#EF8716"
          stroke="#371300"
          strokeWidth="1"
          d="M68 1c23,0 67,17 69,39 4,38 5,52 -5,69 -20,36 -68,46 -120,-9 -27,-28 -7,-101 56,-99z"
        />
        <path
          className="top-inner"
          fill="#537571"
          stroke="#DCB467"
          strokeWidth="1"
          d="M69 22c33,-7 52,21 54,37 3,26 -1,28 -8,40 -15,25 -48,25 -85,-14 -19,-20 -4,-53 39,-63z"
        />
        <path
          className="bottom-outer"
          fill="#DCB467"
          stroke="#371300"
          strokeWidth="1"
          d="M158 158c30,13 56,50 44,75 -9,18 -22,46 -42,55 -20,10 -48,2 -73,-19 -29,-25 -27,-55 -9,-79 17,-22 43,-48 80,-32z"
        />
        <path
          className="bottom-inner"
          fill="#263D56"
          stroke="#537571"
          strokeWidth="1"
          d="M136 180c32,-9 45,13 46,29 3,27 8,29 0,42 -14,25 -52,24 -79,0 -21,-18 -2,-61 33,-71z"
        />
      </svg>   */}
    </>
  );
}
