// import { useState, useEffect } from "react";

// type FetchMethod = "GET" | "POST" | "PUT" | "DELETE";
// export default function useFetch(url: string, method: FetchMethod) {
//   const [data, setData] = useState<string | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         // TODO: Replace with real API call
//         // const response = await fetch(`/api/reviews${productId ? `?productId=${productId}` : ''}`)
//         // const data = await response.json()
//         // setReviews(data)

//         // Using local JSON data for now
//         const response = await fetch(url, { method });
//         const data = await response.json();
//         setData(data);
//         setError(null);
//       } catch (e) {
//         setError(e instanceof Error ? e.message : "Lỗi khi tải dữ liệu (hook)");
//         setData(null);
//       }finally{
//         setLoading(false);
//       }
//     };
//     fetchData();
//   }, []);

//   return { data, error, loading };
// }
