import {NavigateFunction} from "react-router-dom";

import {GoogleAuthProvider, signInWithPopup, User} from "firebase/auth";
import firebase from "../../../../services/firebase";

import debug from "debug";
const log = debug("app:login:google-handler");


const googleSignInHandler = async (navigate:NavigateFunction, setDefaultClaimsReq:Function, server_url:string) => {

    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({
        'login_hint': 'user@example.com',
        'prompt': 'select_account'
    });

    const auth = firebase.auth; // import initialized auth instance.
    auth.useDeviceLanguage(); // use user's device language.

    const credentialResponse = await signInWithPopup(auth, provider);

    if (!credentialResponse) {
        log('no response from google.')
        return navigate("/login", {state: {error_message: "No response from Google. Try again."}});
    }


    const user = credentialResponse.user;
    const tokenIdResult = await user.getIdTokenResult();
    // ========= CHECKING FOR NEW ACCOUNT ============


    // check for custom claims
    const claims = tokenIdResult.claims
    const onboardingStatus = claims.completed_onboarding === undefined // true or false
    const role = claims.role === undefined // string or null
    const subscriptionId = claims.subscriptionId === undefined // string or null


    if (onboardingStatus || role || subscriptionId) { // when user's account is not new but custom claims do not exist.
        console.warn('claims do not exist. setting default claims.', + JSON.stringify({onboardingStatus, role, subscriptionId}))
        return await setDefaultClaimsReq(navigate, user.uid, server_url)
    }

    if (claims.role === null) {
        log('user has claims set but has not chosen a role.');
        return navigate("/onboarding/role-selection");
    } else if (!claims.onboardingStatus) {
        log('user has claims & role set but has not completed onboarding.');
        return navigate(`/onboarding/${claims.role}`);
    }

    // ========= CHECKING FOR NEW ACCOUNT ============


    log('navigating to dashboard.');
    return navigate(`/${claims.role}/dashboard`); // if everything is completely fine.
}


export default googleSignInHandler;