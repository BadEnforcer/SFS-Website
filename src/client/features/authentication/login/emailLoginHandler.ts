import {signInWithEmailAndPassword, UserCredential} from "firebase/auth";
import {FirebaseError} from "firebase/app";

import firebase from "../../../../services/firebase";

import debug from "debug";
import {NavigateFunction} from "react-router-dom";

import {checkUserClaims} from "../common/checkUserClaims";


const auth = firebase.auth; // import initialized auth instance.

const log = debug("app:login:email-handler");
import {showErrorFlashMsg} from "../common/showErrorFlashMsg";

/**
 * @description Handles email login and redirect according to checkUserClaims function .
 * @param {string} email - user's email.
 * @param {string} password - user's password.
 * @param {NavigateFunction} navigate - react-router-dom's navigate function.
 * @returns {Promise<void>}
 * */
const handleEmailLogin = async (email: string, password: string, navigate: NavigateFunction): Promise<void> => {
    try {
        log('signing in with email and password.')
        const user = await signInWithEmailAndPassword(auth, email, password); // sign in with email and password.
        return await checkUserClaims(user, navigate); // redirecting function.

    } catch (error) {
        if (error instanceof FirebaseError) {
            if (error.code === 'auth/user-not-found') {
                log('user not found.');
                return showErrorFlashMsg('No account found with this email.');
            }

            if (error.code === 'auth/invalid-email' || error.code === 'auth/wrong-password' || error.code === 'auth/invalid-credential') {
                log('invalid email.');
                return showErrorFlashMsg('Invalid email or password. Please try again.');

            }

            if (error.code === 'auth/user-disabled') {
                log('user disabled.');
                return showErrorFlashMsg('Account is disabled. Please contact support.');
            }


            if (error.code === 'auth/too-many-requests') {
                log('too many requests.');
                return showErrorFlashMsg('Too many requests. Please try again later.');
            }
        }

        log(`error occurred while signing in with email and password. ${error}`)
        return showErrorFlashMsg('An error occurred. Please try again.');
    }
}

export {handleEmailLogin};