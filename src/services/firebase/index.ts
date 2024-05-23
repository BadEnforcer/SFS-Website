import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";
import {getStorage} from "firebase/storage";


const firebaseConfig = {
    apiKey: "AIzaSyDKmlvCw610NsX15yB79NHuCsEF7H4reqg",
    authDomain: "embergrove-f84a1.firebaseapp.com",
    // authDomain: 'localhost:3000',
    projectId: "embergrove-f84a1",
    storageBucket: "embergrove-f84a1.appspot.com",
    messagingSenderId: "927241191480",
    appId: "1:927241191480:web:afacd64bff49249e7726cd",
    measurementId: "G-YX643CRG4C"
};

// ! PRODUCTION == Set authDomain: "<the-domain-that-serves-your-app>" in the config during production.


const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const auth = getAuth(app);
const storage = getStorage(app);

export default {app, auth}
