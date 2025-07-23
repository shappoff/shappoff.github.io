import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_PRIKHODY_APIKEY,
    authDomain: process.env.NEXT_PUBLIC_PRIKHODY_AUTHDOMAIN,
    databaseURL: process.env.NEXT_PUBLIC_PRIKHODY_DATABASEURL,
    projectId: process.env.NEXT_PUBLIC_PRIKHODY_PROJECTID,
    storageBucket: process.env.NEXT_PUBLIC_PRIKHODY_STORAGEBUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_PRIKHODY_MESSAGINGSENDERID,
    appId: process.env.NEXT_PUBLIC_PRIKHODY_APPID
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
auth.languageCode = 'ru';
export {auth, app};
