import {GoogleAuthProvider} from "firebase/auth";

/**
 * @description Creates a GoogleAuthProvider object with custom parameters.
 * */
export const createGoogleProvider = () => {
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({
        'login_hint': 'user@example.com',
        'prompt': 'select_account'
    });

    return provider;
}