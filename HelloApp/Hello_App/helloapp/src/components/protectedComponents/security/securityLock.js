import React, { useState } from "react";
import { Link } from "react-router-dom";
import usePostHook from "../../../hooks/httpHooks/usePostHook";
import useAuth from "../../../hooks/usefulHooks/useAuth";
import useTheme from "../../../hooks/usefulHooks/useTheme";
import useView from "../../../hooks/usefulHooks/useView";
import ERROR from "../../reuseableComponents/informativeComponents/ERROR";
import Ellipsis from "../../reuseableComponents/loadingComponents/ellipsis";
import "./securityLock.scss";

export default function SecurityLock() {
  const POST = usePostHook();
  const {
    auth: {
      user: { userID },
    },
  } = useAuth();
  const { setView } = useView();
  const {
    theme: {
      theme_profile: { components_background },
    },
  } = useTheme();
  const [item, setItem] = useState({
    error: null,
    isLoaded: true,
  });

  const [securityCode, setSecurityCode] = useState("");

  function handleChange(e) {
    setItem((rest) => ({ ...rest, error: null }));
    return setSecurityCode(e.target.value);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setItem((rest) => ({ ...rest, isLoaded: false }));
    const {
      data: { message },
      status,
    } = await POST({ securityCode, userID }, "user/account/security");
    if (status === 200) {
      setView((rest) => ({ ...rest, isUnlocked: true }));
    } else {
      setItem((rest) => ({ ...rest, error: { message, status } }));
    }
    return setItem((rest) => ({ ...rest, isLoaded: true }));
  }

  return (
    <>
      <section id="security_Lock">
        <div className={`${components_background} security_code`}>
          <div className={`${components_background} edit_header`}>
            <div className="back">
              <Link to="/" className="backButton">
                <i className="fa fa-arrow-left" aria-hidden="true"></i>
              </Link>
            </div>
            <h4>Enter Password</h4>
          </div>
          <div id="security_form_div">
            <form onSubmit={handleSubmit} className="edit_form">
              <input
                type="input"
                onChange={handleChange}
                value={securityCode}
                name="securityCode"
                id="securityCode"
                placeholder="Please enter your password"
              />
             <ERROR error={item.error} /> 
              {!item.isLoaded ? (
                <Ellipsis />
              ) : (
                <input
                  type="submit"
                  className="btn btn-primary"
                  name="submitPassword"
                  id="submitPassword"
                />
              )}
            </form>
          </div>
        </div>
      </section>
    </>
  );
}
