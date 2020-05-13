// import firebase from "firebase/app";
// // import database from "firebase/database";
// console.log("key: ",process.env.REACT_APP_AUTH_DOMAIN,)
// const config = {
//     apiKey: process.env.REACT_APP_API_KEY,
//     authDomain: process.env.REACT_APP_AUTH_DOMAIN,
//     databaseURL: process.env.REACT_APP_DATABASE_URL,
//     projectId: process.env.REACT_APP_PROJECT_ID,
//     storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
//     messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
//     appId: process.env.REACT_APP_APPID
// };
// firebase.initializeApp(config);

// export default firebase;

// let firebaseCache;

// //getFirebase() function will ensure we only call initializeApp one time.
// export const getFirebase = () => {
//     if (firebaseCache) {
//         return firebaseCache;
//     }

//     firebase.initializeApp(config);
//     firebaseCache = firebase;
//     return firebase;
// };

import firebase from 'firebase/app'
import database from "firebase/database";

const firebaseApp = firebase.initializeApp({
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    databaseURL: process.env.REACT_APP_DATABASE_URL,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_APPID
})

// Export the database for components to use.
export const db = firebaseApp.database()