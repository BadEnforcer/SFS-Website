import firebase from "../../../../services/firebase";

import {createUserWithEmailAndPassword} from "firebase/auth";
import lib from "../../../../lib";
import {NavigateFunction} from "react-router-dom";
import {FirebaseError} from "firebase/app";
import {showErrorFlashMsg} from "../common/showErrorFlashMsg";

import debug from "debug";

const log = debug("app:signup:emailSignupHandler");
const role_selection_url:string = '/onboarding/role-selection';

export const emailSignupHandler = async (email:string, password:string, navigate:NavigateFunction) => {
    try {
        const newUserCred = await createUserWithEmailAndPassword(firebase.auth, email, password); // create user with email and password
        const res = await lib.axiosWrapper("POST",
            `${import.meta.env.VITE_API_SERVER_URL}/auth/set-default-claims`, {uid: newUserCred.user.uid}); // set default claims for the user

        if (res.status === 200) { // explicitly check for 200 status code
            return navigate(role_selection_url); // navigate to role selection page
        }

        if (res.status !== 200) { // IF CUSTOM CLAIMS IS NOT SET, the account will be created. redirect the user to login page. login page will handle the claim setting.
            return navigate("/login",
                {state : {error_message: "Oops. We hit a roadblock while trying to automatically log you in. Please login again" }})
        }

    } catch (error) {
        if (error instanceof FirebaseError) {
            switch (error.code) {
                case "auth/email-already-in-use":
                    return showErrorFlashMsg("Email is already in use.")
                case "auth/weak-password":
                    return showErrorFlashMsg("Password is too weak.")
                case "auth/invalid-email":
                    return showErrorFlashMsg("Invalid email.")
                case "auth/operation-not-allowed":
                    return showErrorFlashMsg("Operation not allowed.")
                default:
                    return showErrorFlashMsg("An error occurred. Please try again.")
            }
        } else {
            log(`Error in emailSignupHandler ${error}`);
            // return showErrorFlashMsg("An error occurred. Please try again.")
            alert(error)
        }
    }
}