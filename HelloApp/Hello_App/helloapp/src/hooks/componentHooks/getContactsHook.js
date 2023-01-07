// import { useEffect, useState } from "react";
// import { useLocation } from "react-router-dom";
// import useGetHook from "../httpHooks/useGetHook";
// import useView from "../usefulHooks/useView";

// export default function useContactsHook() {
//   const GET = useGetHook();
//   const [contacts, setContacts] = useState([]);
//   const { setView } = useView();
//   const { pathname } = useLocation();

//   function GET_CONTACTS() {
//     useEffect(() => {
//       async function fetchData() {
//         const getUsers = await GET("getUsers");

//         setContacts(getUsers.data);

//         setView((rest) => ({
//           ...rest,
//           isLoaded: true,
//         }));
//       }
//       fetchData();
//     }, [pathname]);

//     return contacts
//   }

//   return GET_CONTACTS;
// }
