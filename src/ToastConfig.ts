import { ToastContainerProps } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const toastContainerDefaultValue: ToastContainerProps = {
  position: "top-right",
  autoClose: 2000,
  hideProgressBar: false,
  newestOnTop: false,
  closeOnClick: true,
  rtl: false,
  pauseOnFocusLoss: true,
  draggable: true,
  pauseOnHover: true,
};

export default toastContainerDefaultValue;
