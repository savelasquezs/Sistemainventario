// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: 'AIzaSyCeKnictnv_tLicv_4CkVOF-E_qJsIEUg4',
	authDomain: 'inventario-b661a.firebaseapp.com',
	projectId: 'inventario-b661a',
	storageBucket: 'inventario-b661a.appspot.com',
	messagingSenderId: '445210630972',
	appId: '1:445210630972:web:f4daccd1b47bb15f3f5c39',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export { db };
