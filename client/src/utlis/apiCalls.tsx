import axios from "axios";
import { strings } from "../constants/Strings";

// import { errorNotification } from "../Modules/Shared/Notifications/Notifications";
import { clearCookie, getCookie } from "./cookieUtils";
import { errorNotification } from "../base/Notifications/Notifications";
import { ACCESS_TOKEN } from "./enums/misc";


// const {i18n} = useTranslation();

const instance = axios.create({
  //FROM ENV
  // baseURL: `${protocol}//${strings.base_url}`,
  baseURL: `${strings.base_url}`,

});

instance.interceptors.request.use(
  (config: any) => {
    const accessToken = getCookie(ACCESS_TOKEN);

    if (accessToken) {
      config.headers["Authorization"] = `${accessToken}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

instance.interceptors.response.use((response) => {
  return response;
}, (error) => {
  if (error.response.status === 401 && error.config.url !== "/auth/login") {
    clearCookie(ACCESS_TOKEN);
    window.location.href = "/";
  } else {
    if (error?.response?.data?.message) {
      errorNotification(error?.response?.data?.message);
    }
    return Promise.reject(error);
  }

});

export default instance;