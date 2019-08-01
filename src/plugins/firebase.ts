import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

firebase.initializeApp({
    apiKey: "AIzaSyCfCXUlGN-Bgb-ULGilyYtm4lrbENNPBv0",
    authDomain: "somsook-app.firebaseapp.com",
    databaseURL: "https://somsook-app.firebaseio.com",
    projectId: "somsook-app",
    storageBucket: "somsook-app.appspot.com",
})

const db = firebase.firestore();
const auth = firebase.auth();
const { currentUser } = auth;
const { Timestamp } = firebase.firestore

export {
    db,
    auth,
    currentUser,
    Timestamp
}
