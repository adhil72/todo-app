import {createContext} from "react";

export interface VerifyContextType{
    functions:{
        resendVerificationLink:()=>void,
    },
    states:any
}

const initialState:VerifyContextType = {
    functions:{
        resendVerificationLink:()=>{}
    },
    states:{}
}

export const VerifyContext = createContext<VerifyContextType>(initialState)