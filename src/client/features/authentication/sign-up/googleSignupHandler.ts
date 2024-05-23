import {NavigateFunction} from "react-router-dom";
import {signInWithPopup} from "firebase/auth";
import firebase from "../../../../services/firebase";
import {createGoogleProvider} from "../components/createGoogleProvider";
import lib from "../../../../lib";
import {FirebaseError} from "firebase/app";
import {showErrorFlashMsg} from "../common/showErrorFlashMsg";
import {setDefaultClaimsReq} from "../common/setDefaultClaims";
import {checkUserClaims} from "../common/checkUserClaims";



export const googleSignupHandler = async (navigate:NavigateFunction) => {
    const provider = createGoogleProvider();
    const auth = firebase.auth

    try {
        const newUserCred = await signInWithPopup(auth, provider);

        // Check if the user is newly created
        const metadata = newUserCred.user.metadata;

        if (metadata.creationTime === metadata.lastSignInTime) { // NEW USER. SEND DEF CLAIMS REQUEST
            return setDefaultClaimsReq(navigate, newUserCred.user.uid)
        }

        return checkUserClaims(newUserCred, navigate); // CHECKS AND SETS CLAIMS. IF CLAIMS ARE SET ALREADY, REDIRECTS TO DASHBOARD

    } catch (e) {
        if (e instanceof FirebaseError) {
            switch (e.code) {
                case "auth/account-exists-with-different-credential":
                    return showErrorFlashMsg("Account was created with a different provider. Please use the correct login method.")
                case "auth/operation-not-allowed":
                    return alert("Operation not allowed.")
                default:
                    return alert("An error occurred. Please try again.")
            }
        }
    }

}