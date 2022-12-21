import React from "react"; 
import useDeleteHook from "../../../../../hooks/httpHooks/useDeleteHook";
import useAuth from "../../../../../hooks/usefulHooks/useAuth";
import useView from "../../../../../hooks/usefulHooks/useView";
import ERROR from "../../../../reuseableComponents/informativeComponents/ERROR";
import "./danger.scss";
import Ellipsis from "../../../../reuseableComponents/loadingComponents/ellipsis";

export default function Danger_Zone() {
  const DELETE = useDeleteHook();
 
  const {
    auth: { user },
  } = useAuth();
  const { setView ,view} = useView();

  async function handleSubmit(e) {
    e.preventDefault();
    setView((rest) => ({ ...rest, isLoaded: false }));
    const {
      data: { message, success, status },
    } = await DELETE(`delete/account/${user.userID}`);

    if (status === 200) {
      setView((rest) => ({ ...rest, edit_operation: { success, message } }));
      return setView((rest) => ({ ...rest, isLoaded: true }));
    } else {
      return setView((rest) => ({
        ...rest,
        isLoaded: true,
        error: { message, success },
      }));
    }
  }

  return (
    <>
      <section id="delete_section">
        <form onSubmit={handleSubmit} id="delete_options">
          <ul>
            <li id="temporarily">
              <button disabled type="submit">
                <img
                  src={require("../../../../../assets/icons/temporarily.png")}
                  alt="temporarily_icon"
                />
                Temporarily deactivate my account
              </button>{" "}
            </li>
            <li id="delete">
              <button type="submit">
                <img
                  src={require("../../../../../assets/icons/delete.png")}
                  alt="delete_icon"
                />{" "}
                I want to delete my account
              </button>{" "}
            </li>
          </ul>
        </form>
        {!view.isLoaded ? <Ellipsis /> : <ERROR error={view.error} />}
      </section>
    </>
  );
}
