import { collection, doc, setDoc } from "firebase/firestore";
import { auth, db } from "./config";

let boardsController: any = []
let edited = false

const sync = () => {
    if (!auth.currentUser) return
    const usersCollection = collection(db, 'users')
    const userDoc = doc(usersCollection, auth.currentUser.uid)
    return userDoc
}

const saveBoards = async () => {
    if (!edited) return
    if (!auth.currentUser) return
    edited = false
    const usersCollection = collection(db, 'users')
    const userDoc = doc(usersCollection, auth.currentUser.uid)
    await setDoc(userDoc, { boards: boardsController })
}

const createUserCollection = async () => {
    if (!auth.currentUser) return
    await auth.currentUser.reload()
    const usersCollection = collection(db, 'users')
    const userDoc = doc(usersCollection, auth.currentUser.uid)
    await setDoc(userDoc, { boards: [] })
}

export { sync, saveBoards, createUserCollection }