import {createContext} from "react"

export interface SignUpContextType{
    functions:{
        signUp: (name:string,email: string, password: string) => void
    },
    states:any
}

const initialState:SignUpContextType = {
    functions:{
        signUp:()=>{}
    },
    states:{}
}

export const SignUpContext = createContext<SignUpContextType>(initialState)