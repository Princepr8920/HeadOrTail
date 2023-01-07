import React, { useEffect, useRef, useState } from "react";
import "./edit_verification.scss";
import useTheme from "../../../../hooks/usefulHooks/useTheme";
import useAuth from "../../../../hooks/usefulHooks/useAuth";
import useView from "../../../../hooks/usefulHooks/useView";
import ERROR from "../../../usefulComponents/informativeComponents/ERROR";
import Info from "../../../usefulComponents/informativeComponents/INFO";
import Ellipsis from "../../../usefulComponents/loadingComponents/ellipsis";
import Countdown from "../../../usefulComponents/otherComponents/countdown";
import useVerificationHook from "../../../../hooks/componentHooks/verificationHook";
import Header from "../../reuseableComponents/header";
export default function Edit_verification({ cancel_verification }) {
  const { SUBMIT_CODE, RESEND_CODE } = useVerificationHook();
  const { auth } = useAuth();
  const {
    theme: {
      theme_profile: { components_background },
    },
  } = useTheme();
  const { view } = useView();
  const otpForm = useRef(null);
  const [input, setInput] = useState({
    otp1: "",
    otp2: "",
    otp3: "",
    otp4: "",
    otp5: "",
    otp6: "",
    OTP: "",
  });

  const [item, setItem] = useState({
    error: null,
    info: view.verification.message || "",
    isLoaded: true,
    wait: 0,
    disabled: false,
  });

  useEffect(() => {
    let inputs = document.getElementsByClassName("otp");

    let index = 0;
    otpForm.current.onkeyup = function (e) {
      if (e.keyCode === 13) {
        handleSubmit(e);
      } else if (e.keyCode !== 8 && e.keyCode !== 37 && e.keyCode !== 39) {
        if (inputs[index].value !== "" && index < inputs.length - 1) {
          index++;
          inputs[index].focus();
        }
      } else if (e.keyCode === 37 && index > 0) {
        index--;
        inputs[index].focus();
      } else if (e.keyCode === 39 && index < inputs.length - 1) {
        index++;
        inputs[index].focus();
      } else if (e.keyCode === 8 && e.keyCode !== 37 && e.keyCode !== 39) {
        if (inputs[index].value === "" && index > 0) {
          index--;
          inputs[index].focus();
        }
      }
    };
  }, []);

  function handleChange(e) {
    const { value, name } = e.target;
    if (/^[0-9]*$/.test(value)) {
      setInput((rest) => ({ ...rest, [name]: value }));
    }
    setItem((rest) => ({ ...rest, error: null, info: "" }));
  }

  async function handleSubmit(e) { 
    e.preventDefault();
    let code = "";
    for (let key in input) {
      code += input[key];
    }
    setItem((rest) => ({ ...rest, isLoaded: false }));
    const { message, status } = await SUBMIT_CODE({
      code,
      userID: auth.user.userID,
    });
    return status !== 200
      ? setItem((rest) => ({
          ...rest,
          error: { message, status },
          isLoaded: true,
        }))
      : "";
  }

  async function resendCode() {
    setItem((rest) => ({
      ...rest,
      disabled: true,
      info: "",
      error: null,
    }));
    const { message, success, status, time } = await RESEND_CODE();

    if (success) {
      return setItem((rest) => ({
        ...rest,
        error: null,
        info: message,
        wait: time,
        disabled: false,
      }));
    } else if (!success && status === 202) {
      return setItem((rest) => ({
        ...rest,
        error: null,
        info: message,
      }));
    } else {
      return setItem((rest) => ({
        ...rest,
        error: {
          message: message,
          status: status,
        },
        wait: 0,
      }));
    }
  }

  return (
    <>
      <div className={`edit_verification ${components_background}`}>
        <Header name={"Email verification"} link={false} backClick={cancel_verification} />
        <form id="otpForm" ref={otpForm}>
          <input
            onChange={handleChange}
            maxLength="1"
            className="otp"
            type="input"
            name="otp1"
            value={input.otp1}
            required
          />
          <input
            onChange={handleChange}
            maxLength="1"
            className="otp"
            type="input"
            name="otp2"
            value={input.otp2}
            required
          />
          <input
            onChange={handleChange}
            maxLength="1"
            className="otp"
            type="input"
            name="otp3"
            value={input.otp3}
            required
          />
          <input
            onChange={handleChange}
            maxLength="1"
            className="otp"
            type="input"
            name="otp4"
            value={input.otp4}
            required
          />
          <input
            onChange={handleChange}
            maxLength="1"
            className="otp"
            type="input"
            name="otp5"
            value={input.otp5}
            required
          />
          <input
            onChange={handleChange}
            maxLength="1"
            className="otp"
            type="input"
            name="otp6"
            value={input.otp6}
            required
          />
        </form>

        {view.waiting ? (
          <Countdown wait={+item.wait} />
        ) : (
          <button
            type="button"
            disabled={
              item.disabled || view.waiting || item?.error?.status === 429
                ? true
                : false
            }
            onClick={resendCode}
            className="resend_code"
          >
            Resend verification email
          </button>
        )}

        {!item.error ? (
          <Info info={item.info} green={true} />
        ) : (
          <ERROR error={item.error} />
        )}

        <form id="submitOtp" onSubmit={handleSubmit}>
          {!item.isLoaded ? (
            <Ellipsis />
          ) : (
            <input type="submit" className="btn btn-dark" value="Verify" />
          )}
        </form>
      </div>
    </>
  );
}
