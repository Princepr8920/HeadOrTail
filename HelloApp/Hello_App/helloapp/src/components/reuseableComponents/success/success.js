import { useLocation,Link } from "react-router-dom";
import useTheme from "../../../hooks/usefulHooks/useTheme";
import useView from "../../../hooks/usefulHooks/useView";
import "./success.scss";

export default function Edit_Success({disableEdit}) {
  const {view, setView } = useView();
  const {
    theme: {
      theme_profile: { components_background },
    },
  } = useTheme();

  const location = useLocation();

  return (
    <>
      <div className="success_ok">
        <div
          className={`success_info  ${components_background} greenBorder}`}
        >
          <div className="success_message">
            <img
              src={require("../../../assets/icons/success.png")}
              alt="success_icon"
            />
            <p>{view.edit_operation.message}</p>
          </div>
          <Link
            onClick={disableEdit}
            className="btn btn-success"
            to={location.pathname}
          >
            Okey
          </Link>
        </div>
      </div>
    </>
  );
}
