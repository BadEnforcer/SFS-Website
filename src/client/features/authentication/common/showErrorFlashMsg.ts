import {Slide, toast} from "react-toastify";


export const showErrorFlashMsg = (error_message: string) => {
    toast.error(error_message, {
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
    });
}