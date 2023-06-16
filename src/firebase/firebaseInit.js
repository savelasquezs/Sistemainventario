// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'; //se utiliza para inicializar la app de firestore con las config necesarias
import { getFirestore } from 'firebase/firestore'; //permite interactuar con la base de datos de firestore
import { getStorage } from 'firebase/storage';//permite interactuar con el almacenamiento de archivos de Firebase.
import { getAuth } from 'firebase/auth';//permite autenticar y autorizar a los usuarios.
import { getFunctions } from 'firebase/functions';//permite ejecutar funciones en la nube de Firebase.

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
//Este fragmento de codigo es una configuración de Firebase y la inicialización de los servicios de Firebase en una aplicación web.
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
//Esto crea una instancia de la aplicación Firebase que se puede utilizar para acceder a los diferentes servicios.
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);
const auth = getAuth(app);
const functions = getFunctions(app);

export { db, app, storage, auth, functions };
