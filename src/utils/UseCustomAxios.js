"use client"
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { common } from "../../public/js/common";

const useCustomAxios = () => {
  const router = useRouter();

  const customAxios = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_SERVER,
  });

  useEffect(() => {
    const interceptResponse = (response) => {
      if (response.data.message) {
        const jwtExpired = response.data.message === "expired";

        const notNeededLoginList = JSON.parse(
          process.env.NEXT_PUBLIC_WHITELIST_URL
        );
        if (!notNeededLoginList.includes(router.pathname)) {
          if (jwtExpired) {
            common.setItemWithExpireTime("loggedIn", false, 0);
            document.cookie = "_actk" + "=; expires=Thu, 01 Jan 1970 00:00:01 GMT;";
            document.cookie = "_rftk" + "=; expires=Thu, 01 Jan 1970 00:00:01 GMT;";
            router.replace("/login");
          }
        } else {
          if (jwtExpired) {
            common.setItemWithExpireTime("loggedIn", false, 0);
            document.cookie = "_actk" + "=; expires=Thu, 01 Jan 1970 00:00:01 GMT;";
            document.cookie = "_rftk" + "=; expires=Thu, 01 Jan 1970 00:00:01 GMT;";
          }
        }
      }
      return response;
    };

    const interceptError = (error) => {
      return Promise.reject(error);
    };

    const responseInterceptor = customAxios.interceptors.response.use(
      interceptResponse,
      interceptError
    );

    return () => {
      // 언마운트 시 인터셉터 해제
      customAxios.interceptors.response.eject(responseInterceptor);
    };
  }, [customAxios, router]);

  return customAxios;
};

export default useCustomAxios;


// import axios from "axios";
// import { useRouter } from "next/navigation";
// import { common } from "./common";






// const router = useRouter();

// export const customAxios = axios.create({
//   baseURl: process.env.NEXT_PUBLIC_API_SERVER,
// })

// customAxios.interceptors.response.use(
//   function (response) {
//     if (response.data.message) {
//       const jwtExpired = response.data.message && response.data.message === "expired" ? true : false;

//       const notNeededLoginList = JSON.parse(process.env.NEXT_PUBLIC_WHITELIST_URL);
//       if (!notNeededLoginList.includes(router.pathname)) {
//         if (jwtExpired === true) {
//           common.setItemWithExpireTime("loggedIn", false, 0)
//           document.cookie = "_actk" + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
//           document.cookie = "_rftk" + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
//           router.replace("/login");
//         };
//       } else {
//         if (jwtExpired === true) {
//           common.setItemWithExpireTime("loggedIn", false, 0)
//           document.cookie = "_actk" + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
//           document.cookie = "_rftk" + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
//         };
//       }

//     }
//     return response;
//   },
//   function (err) {
//     return Promise.reject(err);
//   }

// )