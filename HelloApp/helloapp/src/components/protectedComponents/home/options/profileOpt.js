import React from 'react'
import { Link } from 'react-router-dom'
import useView from '../../../../hooks/useView'
import "./profileOpt.scss"
export default function Profile() {
  const {view} = useView()
   
  return (
    <div id="pic_div">
                <img
                  id="dp_in_options"
                   src={view.my_Profile.user.picture}   
                  alt="profile_img"
                />
                <div id="manage_profile">
                  <h5>{view.my_Profile.user.username}</h5>
                  <p>{view.my_Profile.user.email}</p>
                  <div id="profileLink">
                    <Link to="/edit">Manage your HelloApp Account</Link>
                  </div>
                </div>
              </div>
  )
}
