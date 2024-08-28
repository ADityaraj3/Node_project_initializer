import { toast, ToastOptions } from "react-toastify";

const pos: ToastOptions = { position: "top-right" }; // Correct way to set position

export const successNotification = (msg: string) => {
  toast.success(msg, pos);
};

export const errorNotification = (msg: string) => {
  toast.error(msg, pos);
};

export const warnNoti = (msg: string) => {
  toast.warning(msg, pos);
};
