import {UserCredential} from "firebase/auth";
import {NavigateFunction} from "react-router-dom";

import debug from "debug";
const log = debug("app:login:checkUserClaims");

import {setDefaultClaimsReq} from "./setDefaultClaims";

/**
 * @description This function checks the user's claims and navigates the user to the appropriate page.
 * @success-redirect - If the user has completed onboarding, role and subscriptionId, the user is redirected to the dashboard.
 * @failure-role - If the user has not chosen a role, the user is redirected to the role selection page.
 * @failure-onboarding - If the user has not completed onboarding, role or subscriptionId, the user is redirected to the onboarding page.
 * @param {UserCredential} credResponse - The user credential response from firebase.
 * @param {NavigateFunction} navigate - The function to navigate the user to a different page.
 * @returns {Promise<void>}
 * */


export const checkUserClaims = async (credResponse:UserCredential, navigate:NavigateFunction): Promise<void> => {
    const user = credResponse.user;
    const tokenIdResult = await user.getIdTokenResult();
    // ========= CHECKING FOR NEW ACCOUNT ============
    // check for custom claims
    const claims = tokenIdResult.claims
    const onboardingStatus = claims.completed_onboarding === undefined // true or false
    const role = claims.role === undefined // string or null
    const subscriptionId = claims.subscriptionId === undefined // string or null


    if (onboardingStatus || role || subscriptionId) { // when user's account is not new but custom claims do not exist.
        console.warn('claims do not exist. setting default claims.', + JSON.stringify({onboardingStatus, role, subscriptionId}))
        return await setDefaultClaimsReq(navigate, user.uid);
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