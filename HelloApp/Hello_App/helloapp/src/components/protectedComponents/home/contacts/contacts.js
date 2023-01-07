import { useEffect } from "react";
import "./contacts.scss";
import React from "react";
import { Link } from "react-router-dom";
import useGetHook from "../../../../hooks/httpHooks/useGetHook";
import useTheme from "../../../../hooks/usefulHooks/useTheme";
import Spinner from "../../../usefulComponents/loadingComponents/spinner";
import useView from "../../../../hooks/usefulHooks/useView";

export default function Contacts() {
  const { setView, view } = useView();
  const GET = useGetHook();
  const {
    theme: {
      theme_profile: { components_background },
    },
  } = useTheme();

  useEffect(() => {
    async function fetchData() {
      const getUsers = await GET("getUsers");
      setView((rest) => ({ ...rest, contacts: getUsers.data, isLoaded: true }));
    }
    fetchData();
  }, []);

  return (
    <section className={`contacts ${components_background} `}>
      <nav className="show-selected">
        <ul>
          <li>
            {" "}
            <Link className="selectdLink" to="/peoples">
              Chats
            </Link>{" "}
          </li>
          <li>
            {" "}
            <Link className="selectdLink" to="/status">
              Status
            </Link>{" "}
          </li>
          <li>
            {" "}
            <Link className="selectdLink" to="/calls">
              Calls
            </Link>
          </li>
        </ul>
      </nav>

      <div className={`friendZone  ${components_background}`}>
        {view.isLoaded ? (
          <ul>
            {view.contacts.map((user) => {
              return (
                <li className="friendsList" key={user.username}>
                  <ul id="friends">
                    <li id="imgList">
                      <input
                        type="image"
                        className="friendsDp"
                        src={user.picture}
                        alt="profile_img"
                      />
                    </li>

                    <li id="nameList">
                      <Link
                        className="friendsName"
                        to={`/chats/${user.username}`}
                      >
                        {user.username}
                      </Link>
                    </li>
                  </ul>
                </li>
              );
            })}
          </ul>
        ) : (
          <Spinner />
        )}
      </div>
    </section>
  );
}
