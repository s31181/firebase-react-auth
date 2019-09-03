import app from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'

const config = {
    apiKey: "AIzaSyCQc-XOvBaimdw1NsTM4M7mc4gVqzUxKow",
    authDomain: "react-firebase-app-26571.firebaseapp.com",
    databaseURL: "https://react-firebase-app-26571.firebaseio.com",
    projectId: "react-firebase-app-26571",
    storageBucket: "react-firebase-app-26571.appspot.com",
    messagingSenderId: "915685304434",
  };

export default class Firebase {
    constructor(){
        app.initializeApp(config);

        this.auth = app.auth();
        this.db = app.database();
    }

    // *** Merge Auth and DB User API *** //

  onAuthUserListener = (next, fallback) =>
  this.auth.onAuthStateChanged(authUser => {
    if (authUser) {
      this.user(authUser.uid)
        .once('value')
        .then(snapshot => {
          const dbUser = snapshot.val();

          // default empty roles
          if (!dbUser.roles) {
            dbUser.roles = {};
          }

          // merge auth and db user
          authUser = {
            uid: authUser.uid,
            email: authUser.email,
            ...dbUser,
          };

          next(authUser);
        });
    } else {
      fallback();
    }
  });

    // ======================== Authorization of API ============================

    // ** Createing the User with and Email and password **
    doCreateUserWithEmailAndPassword = (email, password) =>
        this.auth.createUserWithEmailAndPassword(email, password);

    // ** Sign in method using firebase **
    doSignInWithEmailAndPassword = (email, password) =>
        this.auth.signInWithEmailAndPassword(email, password);

    // ** If the user is signed in this function signs them out **
    doSignOut = () => this.auth.signOut();

    // ** If the user needs to reset the password (forgot/unable to access) **
    doPasswordReset = email => this.auth.sendPasswordResetEmail(email);

    // ** If the user is signed in and wants to update their password. **
    doPasswordUpdate = password =>
        this.auth.currentUser.updatePassword(password);

    // ** User API **

    user = uid => this.db.ref(`users/${uid}`)

    users = () => this.db.ref('users')

}