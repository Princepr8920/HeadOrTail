import useAuth from "../../hooks/usefulHooks/useAuth";

export default function EmailSuccess() {
  let { auth } = useAuth();

  return (
    <div className="login-container">
      <div id="info-container">
        <div id="success-info">
          <h3>{auth.message}</h3>
          <p>{auth.info.sent}</p>
          <p>{auth.info.instructions}</p>
          <span>
            <strong>{auth.info.email}</strong>
          </span>
        </div>
        <div id="goto">
          <a href="https://mail.google.com/mail/u/0/#inbox">
            {" "}
            Go to inbox{" "}
            <i
              style={{ marginLeft: "5px" }}
              className="fa fa-inbox"
              aria-hidden="true"
            ></i>
          </a>
        </div>
      </div>
    </div>
  );
}
