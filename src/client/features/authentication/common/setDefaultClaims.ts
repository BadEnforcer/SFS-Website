import {NavigateFunction} from "react-router-dom";
import lib from "../../../../lib";

import debug from "debug";

const log = debug("app:login:set-default-claims");
import {navigateToLoginWithError} from "../login/navigateToLoginWithError";

/**
 * @description sets default claims for a user.
 * @success - navigates to /onboarding/role-selection.
 * @failure - navigates to /login with an error message.
 * @param navigate - function to navigate to a different route.
 * @param uid - user's uid.
 * @param server_url - server url.
 * @returns void
 * */

const server_url = import.meta.env.VITE_API_SERVER_URL as string;

const setDefaultClaimsReq = async (navigate:NavigateFunction, uid:string) => {
    try {
        await lib.axiosWrapper('POST', server_url + '/auth/set-default-claims' ,{uid})
        log('default claims set successfully. navigating to role selection.')
        navigate(`/onboarding/role-selection`); // TODO: implement on server side correctly.
    }
    catch (error) {
        log(`error occurred while setting default claims. ${error}`)
        return navigateToLoginWithError(navigate, 'An error occurred. Please try again.');
    }
}

export {setDefaultClaimsReq};