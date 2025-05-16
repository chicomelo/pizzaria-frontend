import { toast, ToastContent, ToastOptions, Slide, Id } from "react-toastify";

export enum ToastType {
  SUCCESS = "success",
  ERROR = "error",
  INFO = "info",
  WARNING = "warning",
  DEFAULT = "default",
}

export const defaultToastOptions: ToastOptions = {
  position: "top-right",
  autoClose: 2000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: "colored", // light - dark - colored
  transition: Slide, // Bounce - Zoom - Flip
};

export const showToast = (
  type: ToastType,
  content: ToastContent,
  options: Partial<ToastOptions> = {},
): Id => {
  const optionsToApply = { ...defaultToastOptions, ...options };

  switch (type) {
    case ToastType.SUCCESS:
      return toast.success(content, optionsToApply);
    case ToastType.ERROR:
      return toast.error(content, optionsToApply);
    case ToastType.INFO:
      return toast.info(content, optionsToApply);
    case ToastType.WARNING:
      return toast.warn(content, optionsToApply);
    case ToastType.DEFAULT:
    default:
      return toast(content, optionsToApply);
  }
};
