import firebase from 'firebase'
import firebaseConfig from './firebaseConfig'

firebase.initializeApp(firebaseConfig)
firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)

export default firebase
