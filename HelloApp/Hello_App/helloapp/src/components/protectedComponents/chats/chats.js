import { useState, useEffect } from "react";
import ProfileView from "../home/liveView/view";
import StatusView from "../home/status/status"; 
import "./chats.scss";
import SideChats from "./sideChats/sideChats";
import { useParams, Link } from "react-router-dom";
import useView from "../../../hooks/usefulHooks/useView";
import useGetHook from "../../../hooks/httpHooks/useGetHook";
import useTheme from "../../../hooks/usefulHooks/useTheme";
  
export default function Chats() { 
  const {theme:{theme_profile:{components_background}}} = useTheme()
  const GET = useGetHook()
  let { view, setView } = useView();
  let params = useParams();
  let { username } = params; 
  let [getUser, setUser] = useState({
    user: {},
  });

 

  useEffect(()=>{
    async function fetchData() {
    const getUsers = await GET(`getUser/${username}`)
   setUser((rest) => ({ ...rest, user: getUsers.data }));
    }
   fetchData()
  },[username])
 
  
 
  return (
    <div className={`chats-container ${components_background}`}>
      <SideChats />
      <section
        style={view?.collapse ? { width: "75%" } : { width: "60%" }}
        className={`chats ${components_background}`}
      >
        <div className="show-selected chat-header">
          <div className="chat-header-Left">
            <div className="back">
              <Link className="backButton" to="/" replace>
                <i className="fa fa-arrow-left" aria-hidden="true"></i>
              </Link>
            </div>

            <div id="currentChatDp-icon">
                <input
                  type="image"
                  className="currentChatDp"
                  src={getUser.user.picture}
                  alt="profile_img"
                />
              </div> 

            <div className="chatWith">
              <p>{getUser.user.username}</p>
            </div>
          </div>
        </div>


        
        <div className={`chat-view ${components_background}`}>
          <div className="messages-container">
            <div id="message" className={`${components_background}`}>hello ❤</div>
          </div>

          <div className={`message-inputs ${components_background}`}>
            <input id="type-message" type="text" placeholder="message" />
            <button id="send">
              send
            </button>
          </div>
        </div>
      </section>
      <div className="chatsAndView">
        <StatusView />
        <ProfileView />
      </div>
    </div>
  );
}
