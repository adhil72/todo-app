import {createContext} from "react";

export interface AppContextType{
    functions:{
        showMessage:(message:string)=>void,
    },
    states:{
        setProgressing:(progressing:boolean)=>void,
        progressing:boolean
    }
}

const initialState:AppContextType = {
    functions:{
        showMessage:()=>{}
    },
    states:{
        setProgressing:()=>{},
        progressing:false
    }
}

export const AppContext = createContext<AppContextType>(initialState)