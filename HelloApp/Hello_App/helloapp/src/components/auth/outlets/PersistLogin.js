import { useState } from "react";
import { Outlet } from "react-router-dom";
import useRefresh from "../../../hooks/usefulHooks/refresh";
import useAuth from "../../../hooks/usefulHooks/useAuth";

import { useEffectOnce } from "../../../modules/usereffectonce";

const PersistLogin = () => {
  const [isAppLoading, setIsAppLoading] = useState(true);
  const refresh = useRefresh();
  const { auth } = useAuth(); 
  useEffectOnce(() => {
    const verifyToken = async () => {
      console.log("persist login is here");
      try {
        await refresh();
      } catch (error) { 
        console.error(error);
      } finally {
        setIsAppLoading(false);
      }
    };

    !auth?.accessToken ? verifyToken() : setIsAppLoading(false);
  }, []);

  return (
    <>
      {isAppLoading ? (
        <div id="loading">
          <div className="spinner-border" role="status"></div> 
          <h1> Loading... </h1>
        </div>
      ) : (
        <Outlet />
      )}
    </>
  );
};

export default PersistLogin;
