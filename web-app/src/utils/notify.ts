import { toast, ToastOptions } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
toast.configure({
  position: "top-center",
  pauseOnHover: false,
  hideProgressBar: true,
});

export function showError(msg: string, options: ToastOptions = {}) {
  toast.error(msg, options);
}

export function showInfo(msg: string, options: ToastOptions = {}) {
  toast.info(msg, options);
}

export function showSuccess(msg: string, options: ToastOptions = {}) {
  toast.success(msg, options);
}
