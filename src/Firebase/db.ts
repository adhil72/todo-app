import { collection, doc, setDoc, getDoc } from "firebase/firestore";
import { auth, db } from "./config";
import { useContext } from "react";
import { AppContext } from "../../app/AppContext";

let data: any = []
let edited = false
let syncing = false

const sync = async () => {
    let pb = document.getElementById("pb")
    if (pb) pb.style.display = "block"
    if (!auth.currentUser) return
    const usersCollection = collection(db, 'users')
    const userDoc = doc(usersCollection, auth.currentUser.uid)
    const userDocSnap = await getDoc(userDoc)
    if (!userDocSnap.exists()) {
        await createUserCollection()
    } else {
        const userData = userDocSnap.data()
        if (userData) {
            data = userData.workspace
        }
    }
    if (pb) pb.style.display = "none"
    return data
}

const saveBoards = async () => {
    let pb = document.getElementById("pb")
    if (pb) pb.style.display = "block"
    if (!auth.currentUser) return
    const usersCollection = collection(db, 'users')
    const userDoc = doc(usersCollection, auth.currentUser.uid)
    await setDoc(userDoc, { workspace: data })
    if (pb) pb.style.display = "none"
    return
}

const createUserCollection = async () => {
    if (!auth.currentUser) return
    await auth.currentUser.reload()
    const usersCollection = collection(db, 'users')
    const userDoc = doc(usersCollection, auth.currentUser.uid)
    await setDoc(userDoc, { workspace: {} })
}

const setEdited = (value: boolean) => {
    edited = value
    if (edited === true && syncing === false) {
        syncing = true
        edited = false
        saveBoards().then(() => {
            syncing = false
            if (edited === true) setEdited(true)
        })

    }
}

const setDataController = (boards: any) => {
    data = boards
}

export { sync, saveBoards, createUserCollection, setEdited, setDataController }