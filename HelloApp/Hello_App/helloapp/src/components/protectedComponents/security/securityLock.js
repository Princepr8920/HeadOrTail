import React, { useState } from "react"; 
import usePostHook from "../../../hooks/httpHooks/usePostHook";
import useAuth from "../../../hooks/usefulHooks/useAuth";
import useTheme from "../../../hooks/usefulHooks/useTheme";
import useView from "../../../hooks/usefulHooks/useView";
import ERROR from "../../usefulComponents/informativeComponents/ERROR";
import Ellipsis from "../../usefulComponents/loadingComponents/ellipsis";
import Header from "../reuseableComponents/header";
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
          <Header name={"Confirm access"} link={true}/>
          <div>
            <form onSubmit={handleSubmit} className="edit_form">
              <div className="edit_inputs">
                <label htmlFor="securityCode">Enter Password</label>
                <input
                  type="input"
                  onChange={handleChange}
                  value={securityCode}
                  name="securityCode"
                  id="securityCode"
                  placeholder="Please enter your password"
                />
              </div>
              <ERROR error={item.error} />
              {!item.isLoaded ? (
                <Ellipsis />
              ) : (
                <input
                  type="submit"
                  className="btn btn-dark"
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
