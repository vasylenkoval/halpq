import firebase from 'firebase';

// Initialize Firebase
const config = {
  apiKey: 'AIzaSyDvDawJd8aoqFPufOK2auL4Z8wU95JfL20',
  authDomain: 'halpq-project.firebaseapp.com',
  databaseURL: 'https://halpq-project.firebaseio.com',
  projectId: 'halpq-project',
  storageBucket: 'halpq-project.appspot.com',
  messagingSenderId: '408437676969',
};

firebase.initializeApp(config);

export default firebase;
