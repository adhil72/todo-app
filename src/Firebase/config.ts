import {initializeApp} from 'firebase/app';
import {getFirestore} from 'firebase/firestore';
import {getAuth} from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyCYR3NpOpxZHZDnag6aKFKNct2A59LYpbw",
    authDomain: "frdtodo.firebaseapp.com",
    projectId: "frdtodo",
    storageBucket: "frdtodo.appspot.com",
    messagingSenderId: "969316314528",
    appId: "1:969316314528:web:70260492dbe8fdcec688c5",
    measurementId: "G-80P2BD22X2"
};


const config = initializeApp(firebaseConfig);
const db = getFirestore(config);
const auth = getAuth(config);




export {db, auth, config}