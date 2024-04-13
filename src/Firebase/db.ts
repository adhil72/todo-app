import { collection, doc, setDoc, getDoc } from "firebase/firestore";
import { auth, db } from "./config";
import { useContext } from "react";
import { AppContext } from "../../app/AppContext";

let boardsController: any = []
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
            boardsController = userData.workspace
        }
    }
    if (pb) pb.style.display = "none"
    return boardsController
}

const saveBoards = async () => {
    let pb = document.getElementById("pb")
    if (pb) pb.style.display = "block"
    if (!auth.currentUser) return
    const usersCollection = collection(db, 'users')
    const userDoc = doc(usersCollection, auth.currentUser.uid)
    await setDoc(userDoc, { boards: boardsController })
    if (pb) pb.style.display = "none"
    return
}

const createUserCollection = async () => {
    if (!auth.currentUser) return
    await auth.currentUser.reload()
    const usersCollection = collection(db, 'users')
    const userDoc = doc(usersCollection, auth.currentUser.uid)
    await setDoc(userDoc, { workspace: [] })
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

const setBoardsController = (boards: any) => {
    boardsController = boards
}

export { sync, saveBoards, createUserCollection, setEdited, setBoardsController }