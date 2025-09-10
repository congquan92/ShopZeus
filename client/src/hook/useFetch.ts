// import { useState, useEffect } from "react";

// export default function useFetch(url : string, method : RequestInit) {
//   const [data, setData] = useState([]);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const resp = await fetch(url, method);
//         const res = await resp.json();
//         if (isMounted) setData(res.data);
//       } catch (e) {
//         if (isMounted) setData([]);
//         if (isMounted) setError(e);
//       }
//     };

//     let isMounted = true;
//     fetchData();
//     return () => {
//       isMounted = false;
//     };
//   }, []);

//   return { data, error };
// }