import axios from "axios";
import { strings } from "../../../../Office_Projects/telekomsozial-internal-application-tool-frontend/src/constants/Strings";
// import { errorNotification } from "../Modules/Shared/Notifications/Notifications";
import { clearCookie, getCookie } from "./cookieUtils";
import { errorNotification } from "../../../../Office_Projects/telekomsozial-internal-application-tool-frontend/src/base/Notifications/Notifications";
import { ACCESS_TOKEN, SELECTED_LANGUAGE } from "../../../../Office_Projects/telekomsozial-internal-application-tool-frontend/src/utils/enums/misc";

// const {i18n} = useTranslation();

const instance = axios.create({
  //FROM ENV
  // baseURL: `${protocol}//${strings.base_url}`,
  baseURL: `${strings.base_url}`,

});

instance.interceptors.request.use(
  (config: any) => {
    const accessToken = getCookie(ACCESS_TOKEN);
    const language = getCookie(SELECTED_LANGUAGE)

    if (accessToken) {
      config.headers["Authorization"] = `${accessToken}`;
    }
    config.headers["lang"] = language ? language : "de";

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