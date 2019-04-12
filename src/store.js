import { createStore, combineReducers, compose } from 'redux'
import firebase from 'firebase'
import 'firebase/firestore'
import { reactReduxFirebase, firebaseReducer } from 'react-redux-firebase'
import { reduxFirestore, firestoreReducer} from 'redux-firestore'
import notifyReducer from './reducers/notifyReducer'

const firebaseConfig = {
    apiKey: "AIzaSyAetzjiXxKpR2H2zgONW3TEZoPR_2kqy04",
    authDomain: "reactclientpanelpractice.firebaseapp.com",
    databaseURL: "https://reactclientpanelpractice.firebaseio.com",
    projectId: "reactclientpanelpractice",
    storageBucket: "reactclientpanelpractice.appspot.com",
    messagingSenderId: "903717904526"
}

// react-redux-firebase config
const rrfConfig = {
    userProfile: 'users',
    useFirestoreForProfile: true  // Firestore for Profile instead of Realtime DB
}

// init firebase instance
firebase.initializeApp(firebaseConfig)

const firestore = firebase.firestore()

// Add reactReduxFirebase enhancer when making store creator
const createStoreWithFirebase = compose(
    reactReduxFirebase(firebase, rrfConfig), // firebase instance as first argument
    reduxFirestore(firebase) // <- needed if using firestore
  )(createStore)


// Add firebase to reducers
const rootReducer = combineReducers({
    firebase: firebaseReducer,
    firestore: firestoreReducer, // <- needed if using firestore
    notify: notifyReducer
  })

// Create store with reducers and initial state
const initialState = {}

// Create Store
const store = createStoreWithFirebase(rootReducer, initialState, compose(
    reactReduxFirebase(firebase),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
))

export default store