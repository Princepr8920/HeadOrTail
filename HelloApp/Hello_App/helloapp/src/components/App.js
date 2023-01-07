import "../App.scss";
import HOME from "./protectedComponents/home/home";
import Login from "./auth/login";
import Signup from "./auth/signup";
import EDIT from "./protectedComponents/edit/edit";
import PROFILE from "./protectedComponents/profile/profile";
import Error from "./error/error";
import { VerifyUser } from "./protectedComponents/VerifyUser";
import { Routes, Route } from "react-router-dom";
import useAuth from "../hooks/usefulHooks/useAuth";
import Layout from "./protectedComponents/Layout";
import RequireAuth from "./auth/outlets/requireAuth";
import PersistLogin from "./auth/outlets/PersistLogin";
import UserVerification from "./auth/outlets/UserVerification";
import Recover from "./auth/recover";
import SetPassword from "./protectedComponents/SetPassword";
import Success from "./emailSuccess/Success";
import EmailSuccess from "./emailSuccess/emailSuccess";
import Chats from "./protectedComponents/chats/chats";
import useView from "../hooks/usefulHooks/useView";
import SecurityOutlet from "./auth/outlets/securityOutlet";
 
function App() {
  let { setView } = useView();
  let { auth } = useAuth();
  

  function clickHandler(e) {
    e.stopPropagation();
    return setView((rest) => ({ ...rest, toggle: false, show_Options: false }));
  } 
  
  return (
    <div onClick={(e) => clickHandler(e, "outside")}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
          <Route path="password/recovery" element={<Recover />} />

          <Route element={<UserVerification />}>
            <Route path="verify/user/account" element={<VerifyUser />} />
            <Route path="email/success" element={<EmailSuccess />} />
            <Route path="success" element={<Success />} />
            <Route
              path="user/passwordrecovery/setnewpassword/:token"
              element={<SetPassword />}
            />
          </Route>

          <Route element={<PersistLogin />}>
            <Route element={<RequireAuth />}>
              <Route path="/" element={<HOME />} />
              <Route element={<SecurityOutlet />}>
              <Route path="edit" element={<EDIT currentUser={auth?.user} />} />
              </Route>
              <Route
                path="profile"
                element={<PROFILE currentUser={auth?.user} />}
              />
              <Route
                path="chats/:username"
                element={<Chats currentUser={auth?.user} />}
              />
            </Route>
          </Route>

          <Route path="*" element={<Error />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
