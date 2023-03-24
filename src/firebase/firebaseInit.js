// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
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
	storageBucket: 'gs://inventario-b661a.appspot.com',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);
export { db, app };
