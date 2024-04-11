import {auth} from "@/Firebase/config";
import {
    createUserWithEmailAndPassword,
    sendEmailVerification,
    signInWithEmailAndPassword,
    updateProfile
} from "@firebase/auth";


const signUpService = async (name:string,email: string, password: string) =>{
    const userCredential = await createUserWithEmailAndPassword(auth,email,password)
    if (!userCredential.user) return null
    await updateProfile(userCredential.user,{
        displayName: name
    });
    await sendEmailVerification(userCredential.user);
    return userCredential.user
}
const signInService = async (email:string,password:string)=>signInWithEmailAndPassword(auth,email,password)

const isEmailVerified = async ()=>{
    const user = auth.currentUser
    if (!user) return null
    await user.reload()
    return user.emailVerified
}

const sendEmailVerificationService = async ()=>{
    const user = auth.currentUser
    if (!user) return null
    await sendEmailVerification(user)
    return true
}


export {signUpService,signInService,isEmailVerified,sendEmailVerificationService}