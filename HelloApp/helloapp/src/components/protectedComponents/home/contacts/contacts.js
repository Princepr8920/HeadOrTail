import { useState, useEffect } from "react";
import "./contacts.scss";
import React from "react";
import { Link } from "react-router-dom"; 
import useGetHook from "../../../../hooks/useGetHook";
import useTheme from "../../../../hooks/useTheme";

export default function Contacts() {
  const GET = useGetHook();
  const {
    theme: {
      theme_profile: { components_background },
    },
  } = useTheme(); 
  let [getUsers, setUsers] = useState({
    users: [],
  });

  useEffect(() => {
    async function fetchData() {
      const getUsers = await GET("getUsers");
      setUsers((rest) => ({ ...rest, users: getUsers.data }));
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
        <ul>
          {getUsers.users.map((user) => {
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
      </div>
    </section>
  );
}
