import {NavigateFunction} from "react-router-dom";

export const navigateToLoginWithError =  (navigate:NavigateFunction, error_message:string) => {
    return navigate('/login', {state: {error_message}})
}