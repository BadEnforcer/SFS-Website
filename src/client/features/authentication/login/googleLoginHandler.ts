import {NavigateFunction} from "react-router-dom";

import {GoogleAuthProvider, signInWithPopup, User} from "firebase/auth";
import firebase from "../../../../services/firebase";

import debug from "debug";
const log = debug("app:login:google-handler");
import {checkUserClaims} from "../common/checkUserClaims";
import {showErrorFlashMsg} from "../common/showErrorFlashMsg";
import {createGoogleProvider} from "../components/createGoogleProvider";

const googleSignInHandler = async (navigate:NavigateFunction) => {

    const provider = createGoogleProvider(); // create google provider.

    const auth = firebase.auth; // import initialized auth instance.
    auth.useDeviceLanguage(); // use user's device language.

    const credentialResponse = await signInWithPopup(auth, provider); // sign in with Google popup.

    if (!credentialResponse) {
        log('no response from google.')
        return showErrorFlashMsg('No response from google. Please login again. if issue persists, contact support.')
    }

    return await checkUserClaims(credentialResponse, navigate); // check user claims and navigate user to appropriate page.

}


export default googleSignInHandler;