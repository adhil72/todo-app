import { collection, doc, getDoc, setDoc, updateDoc } from 'firebase/firestore'
import { auth, db } from './config'
import { WorkspaceType } from '@/Components/Feature/Workspace/Workspace'
import { BoardProps } from '@/Components/Feature/Board/Components/TaskPanel'

let edited = false
let syncing = false

const fetchWorkSpace = async () => {
    let pb = document.getElementById('pb')
    let data = []
    if (pb) pb.style.display = 'block'
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
    if (pb) pb.style.display = 'none'
    return data
}

const saveWorkspace = async (workspaceData: WorkspaceType[]) => {
    let pb = document.getElementById('pb')
    if (pb) pb.style.display = 'block'
    if (!auth.currentUser) return
    const usersCollection = collection(db, 'users')
    const userDoc = doc(usersCollection, auth.currentUser.uid)
    await updateDoc(userDoc, { workspace: workspaceData })
    if (pb) pb.style.display = 'none'
    return
}

const createUserCollection = async () => {
    if (!auth.currentUser) return
    await auth.currentUser.reload()
    const usersCollection = collection(db, 'users')
    const userDoc = doc(usersCollection, auth.currentUser.uid)
    await setDoc(userDoc, { workspace: [], board: [], tasks: [] })
}

const fetchBoard = async () => {
    let pb = document.getElementById('pb')
    let data: BoardProps[] = []
    if (pb) pb.style.display = 'block'
    if (!auth.currentUser) return
    const usersCollection = collection(db, 'users')
    const userDoc = doc(usersCollection, auth.currentUser.uid)
    const userDocSnap = await getDoc(userDoc)
    if (!userDocSnap.exists()) {
        await createUserCollection()
    } else {
        const userData = userDocSnap.data()
        if (userData) {
            data = userData.board
        }
    }
    if (pb) pb.style.display = 'none'
    return data
}

const saveBoard = async (board: any[]) => {
    let pb = document.getElementById('pb')
    if (pb) pb.style.display = 'block'
    if (!auth.currentUser) return
    const usersCollection = collection(db, 'users')
    const userDoc = doc(usersCollection, auth.currentUser.uid)
    await updateDoc(userDoc, { board: board })
    if (pb) pb.style.display = 'none'
    return
}

const saveTask = async (tasks: any[]) => {
    let pb = document.getElementById('pb')
    if (pb) pb.style.display = 'block'
    if (!auth.currentUser) return
    const usersCollection = collection(db, 'users')
    const userDoc = doc(usersCollection, auth.currentUser.uid)
    await updateDoc(userDoc, { tasks: tasks })
    if (pb) pb.style.display = 'none'
    return
}

const fetchTask = async () => {
    let pb = document.getElementById('pb')
    let data: any[] = []
    if (pb) pb.style.display = 'block'
    if (!auth.currentUser) return
    const usersCollection = collection(db, 'users')
    const userDoc = doc(usersCollection, auth.currentUser.uid)
    const userDocSnap = await getDoc(userDoc)
    if (!userDocSnap.exists()) {
        await createUserCollection()
    } else {
        const userData = userDocSnap.data()
        if (userData) {
            data = userData.tasks
        }
    }
    if (pb) pb.style.display = 'none'
    return data
}

export { fetchWorkSpace, createUserCollection, saveWorkspace, fetchBoard, saveBoard, fetchTask, saveTask }
