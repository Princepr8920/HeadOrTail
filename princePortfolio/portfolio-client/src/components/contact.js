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
    const url = "https://prince8920-portfolio.herokuapp.com/contact";
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
      console.log(err)
      if (err?.response?.status === 400) {
        const inputError = err?.response?.data.errObj;
        setValue((rest) => ({
          ...rest,
          inputError: inputError,
        }));
      } else if (err.message === "Network Error") {
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
                      </div>
                    )}
                  </div>
                </form>
              ) : (
                <div id="msg_Limit">
                  <img
                    crossorigin="anonymous"
                    src={require("../assets/illustrations/limit.png")}
                    alt="daily_limit_exceeds"
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
                    <a
                      rel="noreferrer"
                      href="https://mail.google.com/mail/?view=cm&fs=1&to=PrincePr920@outlook.com"
                    >
                      PrincePr920@outlook.com
                    </a>
                  </div>

                  <div id="myPhone">
                    <h3>
                      <i className="fas fa-mobile-alt"></i>Phone
                    </h3>
                    <a rel="noreferrer" href="tel:+917027628920">
                      +917027628920
                    </a>
                  </div>
                </address>
                <div id="social">
                  <a rel="noreferrer" href="https://github.com/Princepr8920">
                    <i className="fa-brands fa-github"></i>
                    <span>Github</span>
                  </a>
                  <a
                    rel="noreferrer"
                    href="https://www.linkedin.com/in/prince-saini-056582201/"
                  >
                    <i className="fa-brands fa-linkedin"></i>
                    <span>Linkedin</span>
                  </a>
                </div>
              </div>
              <div className="contact-bottom">
                <img
                  crossOrigin="anonymous"
                  id="conversation"
                  src={require("../assets/illustrations/contact.png")}
                  alt="conversation_svg"
                />
                <a
                  rel="noreferrer"
                  id="backTotop"
                  title="Back to top"
                  href="/#intro"
                >
                  <i className="fas fa-arrow-circle-up"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
