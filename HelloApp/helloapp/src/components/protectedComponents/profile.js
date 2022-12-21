import React from "react";
//import { useParams, useLocation } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

export default function PROFILE( ) {
  let { auth } = useAuth();
 

 
  let currentUser = auth.user
  //   let { user } = useParams();
  //   let [getvalue,setvalue] = useState({
  //     profile:'',
  //   });

  //   useEffect(()=>{
  //     fetch(`http://localhost:4000/users/${user}`)
  //    .then(res =>res.json())
  //    .then(data=>setvalue((rest)=>({...rest,profile:data})))
  // },[]);

  return (
    <div>
      <div id="show_profile">
        <img
          src={
            currentUser.picture !== "picture not avilable"
              ? currentUser.picture
              : "https://images.unsplash.com/photo-1511367461989-f85a21fda167?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1331&q=80"
          }
          alt="profile_img"
        />
        <h1 className="p-3 text-start">{currentUser.username}</h1>
      </div>
      <div className="vstack gap-3 text-start">
        <div className="bg-light border px-3 fs-4">
          Name : {currentUser.username}
        </div>
        <div className="bg-light border px-3 fs-4">Bio : {currentUser.bio}</div>
        <div className="bg-light border px-3 fs-4">
          Joined At : {Date(currentUser.joined_At)}{" "}
        </div>
        <div className="bg-light border px-3 fs-4">
          Email : {currentUser.email}
        </div>
        <div className="bg-light border px-3 fs-4">
          Last visited : {Date(currentUser.last_visited)}
        </div>
      </div>
    </div>
  );
}
