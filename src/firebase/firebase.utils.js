import firebase from 'firebase/app'

// Only using auth and storage
import 'firebase/firestore';
import 'firebase/auth'

const config = {
    apiKey: "AIzaSyBAt9tdnfS23hw4OBcNIwifYdQVBp9DiOc",
    authDomain: "e-commerce-50e9e.firebaseapp.com",
    databaseURL: "https://e-commerce-50e9e.firebaseio.com",
    projectId: "e-commerce-50e9e",
    storageBucket: "e-commerce-50e9e.appspot.com",
    messagingSenderId: "733049652510",
    appId: "1:733049652510:web:95ff0496373644a430750f",
    measurementId: "G-6FQ6127Q1J"
  };

  export const createUserProfileDocument = async (userAuth, additionalData) => {
    if(!userAuth) return;

    // creat a query reference
    const userRef = firestore.doc(`users/${userAuth.uid}`);

    // use query reference (userRef) to GET all of current users data (if any)
    const snapShot = await userRef.get();

    // .exists is a property attached to the documentSnapshot object
    // returns false if user doesn't esixt
    if(!snapShot.exists) {

        // grab properties we need before SETting our new user
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        // if user doesn't exist...create new user using data from user auth object (above)
        try {
            // .set() is the document refs create method
            await userRef.set({
                displayName,
                email,
                createdAt,
                ...additionalData
            })
        } catch(error) {
            console.log('error catching user', error.message)
        }
    }

    //return userRef to reference it throughout our application
    console.log(snapShot);

    return userRef;
  }


  firebase.initializeApp(config);

  export const auth = firebase.auth();
  export const firestore = firebase.firestore();

  // Set up Google Authentication utility

  // Gives us access to GoogleAuthProvider class from authentication library
  const provider = new firebase.auth.GoogleAuthProvider();

  provider.setCustomParameters({
      // Trigger google pop-up whenever we use Google auth provider
      prompt: 'select_account'
  });
  
  export const signInWithGoogle = () => auth.signInWithPopup(provider);

  export default firebase;