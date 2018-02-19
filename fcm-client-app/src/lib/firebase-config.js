import * as firebase from "firebase";

// Initialize Firebase
// TODO: Replace with your project's customized code snippet
const config = {
    apiKey: "AIzaSyDabUni1OH4AvbCyNb4DR1vaA-HL9aMD1Q",
    authDomain: "fcm-client-e4a3f.firebaseapp.com",
    databaseURL: "https://fcm-client-e4a3f.firebaseio.com",
    projectId: "fcm-client-e4a3f",
    storageBucket: "",
    messagingSenderId: "715065746267"
  };

  const sgcmConfig = {
    apiKey: "AIzaSyCbS5r-sLFrCI49A4QSEauuAFdU1EVzRH0",
    authDomain: "sgcm-194206.firebaseapp.com",
    databaseURL: "https://sgcm-194206.firebaseio.com",
    projectId: "sgcm-194206",
    storageBucket: "sgcm-194206.appspot.com",
    messagingSenderId: "1027703990575"
  };

export default firebase.initializeApp(sgcmConfig);
