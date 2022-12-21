import useAuth from "../../hooks/useAuth"

export default function Success() {
  let { auth } = useAuth();
 
  return (
    <div className="login-container">
      <div id="info-container">
        <div id="success-info"><h3>{auth.message}</h3></div>
        <div id="goto">
        <a href={auth.gotoLink}>Login</a></div>
      </div>
    </div>
  );
}
