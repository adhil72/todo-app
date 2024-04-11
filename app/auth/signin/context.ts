import {createContext} from "react"

export interface SignInContextType{
    functions:{},
    states:any
}

const initialState:SignInContextType = {
    functions:{},
    states:{}
}

export const SignInContext = createContext<SignInContextType>(initialState)