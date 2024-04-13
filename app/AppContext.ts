import { WorkspaceType } from "@/Components/Feature/Workspace/Workspace";
import { createContext } from "react";

export interface AppContextType {
    functions: {
        showMessage: (message: string) => void,
        logout: () => void
    },
    states: {
        setProgressing: (progressing: boolean) => void,
        progressing: boolean
    }
}

const initialState: AppContextType = {
    functions: {
        showMessage: () => { },
        logout: () => { }
    },
    states: {
        setProgressing: () => { },
        progressing: false
    }
}

export const AppContext = createContext<AppContextType>(initialState)