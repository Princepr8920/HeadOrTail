import { useContext } from "react";
import ViewContext from "../../context/ViewContext"

const useView = () => useContext(ViewContext);

export default useView;