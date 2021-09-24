import { initializeApp } from 'firebase/app';
import {
  getAuth,
  signOut,
  signInWithPopup,
  signInGoogle,
  GoogleAuthProvider,
  onAuthStateChanged,
} from 'firebase/auth';

import { firebaseConfig } from './firebaseConfig';

import { authInGoogle, authOutGoogle, userName } from './refs';

import { readUserData } from './firebaseData';

initializeApp(firebaseConfig); // Initialize Firebase
// const analytics = getAnalytics(app);

authInGoogle.addEventListener('click', signInGoogle);
authOutGoogle.addEventListener('click', signOutGoogle);

function onAuthState() {
  const auth = getAuth();
  onAuthStateChanged(auth, (user) => {
    if (user) {
      userName.textContent = user.displayName;
      authInGoogle.style.display = 'none';
      authOutGoogle.style.display = 'inline';

      readUserData(user.uid);
    }
  });
}

function signInGoogle() {
  const provider = new GoogleAuthProvider();
  const auth = getAuth();
  signInWithPopup(auth, provider)
    .then((result) => {
      const user = result.user;
      userName.textContent = result.user.displayName;
      authInGoogle.style.display = 'none';
      authOutGoogle.style.display = 'inline';

      window.location.reload(false);
    })
    .catch((error) => {
      console.error(error);
    });
}

function signOutGoogle() {
  const auth = getAuth();
  signOut(auth)
    .then(() => {
      userName.textContent = '';
      authInGoogle.style.display = 'inline';
      authOutGoogle.style.display = 'none';
      localStorage.clear();

      window.location.reload(false);
    })
    .catch((error) => {
      console.error(error);
    });
}

onAuthState();
