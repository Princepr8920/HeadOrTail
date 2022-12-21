import useLogout from "../../hooks/useLogoutHook";
import { useLocation, Link, useNavigate } from "react-router-dom";

export default function Notice() {
 let logoutUser = useLogout();
 const navigate = useNavigate();
 const location = useLocation();
 const from = location.state?.from?.pathname || "/";

 let logout = async () => {
  await logoutUser();
  navigate("/login",{replace:true});
};
  return (
    <div className="login-container">
      <div id="info-container">
        <div id="success-info"><h3>Are you sure you want to logout ?</h3></div>
        <div className="row">
        <Link className="btn btn-success mt-4" to={from}>Stay</Link>
        <input type="button" value="Logout"  className="btn btn-danger mt-4"onClick={logout}/>
        </div>
      </div>
    </div>
  );
}
