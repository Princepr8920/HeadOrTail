import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import useGetHook from "../../../../hooks/useGetHook";
import useTheme from "../../../../hooks/useTheme";
import useView from "../../../../hooks/useView";
import "./sideChats.scss";
 


export default function SideChats() {
  const {theme:{theme_profile:{components_background}}} = useTheme()
 const GET = useGetHook()
  const { view, setView } = useView();
  const [getItem, setItem] = useState({
    collapse: false,
    users:[]
  });


  useEffect(()=>{
    async function fetchData() {
    const getUsers = await GET("getUsers")
   setItem((rest) => ({ ...rest, users: getUsers.data }));
    }
   fetchData()
  },[])
 

  function handleSideChats() {
    let { collapse } = getItem;
    setItem((rest) => ({ ...rest, collapse: !collapse }));
    setView((rest) => ({ ...rest, collapse: !collapse }));
  }

  let isCollapse = getItem.collapse
    ? [
        "sideChats collapsed",
        "fa fa-arrow-circle-right",
        "none",
        "60px",
        "expend",
      ]
    : [
        "sideChats expend",
        "fa fa-arrow-circle-left",
        "inline",
        "30px",
        "collapse",
      ];
  return (
    <section className={`${isCollapse[0]} ${components_background}`}>
      <div id="sideChats-header">
        <span style={{ display: isCollapse[2] }}>Chats</span>
        <button
          title={isCollapse[4]}
          style={{ width: isCollapse[3] }}
          id="collapse-button"
          onClick={handleSideChats}
        >
          <i className={isCollapse[1]} aria-hidden="true"></i>
        </button>
      </div>
      <div className="active-side-chats">

        <ul>
          {getItem.users?.map((user) => {
            return (
              <li key={user?.username}>
                <ul className="sideContacts">
                  <li id="imgList">
                   
                   
                    {getItem.collapse ? (
                      <Link 
                        to={`/chats/${user?.username}`}
                        replace
                      >
                        <img
                          className="friendsDp"
                          src={user?.picture}
                          title={getItem.collapse ? user?.username : ""}
                          alt="profile_img"
                        />
                      </Link>
                    ) : (
                      <input
                        type="image"
                        className="friendsDp"
                        src={user?.picture}
                        title={getItem.collapse ? user?.username : ""}
                        alt="profile_img"
                      />
                    )}


                  </li>
                  <li id="nameList">
                    <Link className="friendsName"
                      to={`/chats/${user?.username}`}
                      replace
                    >
                      {user?.username}
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
