import { getAnalytics } from "firebase/analytics";
import { initializeApp } from "firebase/app";
import { initializeAppCheck, ReCaptchaV3Provider } from "firebase/app-check";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA3KIs0GNp_Dxc79c7qh2ZBVDVk5HGk--Q",
  authDomain: "beat-fusion-test.firebaseapp.com",
  projectId: "beat-fusion-test",
  storageBucket: "beat-fusion-test.appspot.com",
  messagingSenderId: "911661609775",
  appId: "1:911661609775:web:d123fb7ba1b6befc1c67da",
  measurementId: "G-86YLEG41YK",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const appCheck = initializeAppCheck(app, {
  provider: new ReCaptchaV3Provider("6LfHgkoqAAAAACUFaYoTYZ4EnqAApTfV8x5wJ3co"),
});
getAnalytics(app);
