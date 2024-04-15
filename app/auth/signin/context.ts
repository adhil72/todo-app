import {createContext} from "react"

export interface SignInContextType{
    functions:{
        signIn:(email:string, password:string)=>Promise<void>
    },
    states:any
}

const initialState:SignInContextType = {
    functions:{
        signIn:async(email:string, password:string)=>{}
    },
    states:{}
}

export const SignInContext = createContext<SignInContextType>(initialState)