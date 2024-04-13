import { WorkspaceType } from "@/Components/Feature/Workspace/Workspace";
import { createContext } from "react";

export interface AppContextType {
    functions: {
        showMessage: (message: string) => void,
    },
    states: {
        setProgressing: (progressing: boolean) => void,
        progressing: boolean,
        workspaces: any,
        setWorkspaces: any
    }
}

const initialState: AppContextType = {
    functions: {
        showMessage: () => { }
    },
    states: {
        setProgressing: () => { },
        progressing: false,
        workspaces: [],
        setWorkspaces: () => { }
    }
}

export const AppContext = createContext<AppContextType>(initialState)