import { WorkspaceType } from "@/Components/Feature/Workspace/Workspace"
import { createContext } from "react"

export interface WorkspaceContextType {
    functions: {
        createWorkspace: any,
        editWorkspace: any,
        openWorkspace: any
    },
    states: {
        workspaces: WorkspaceType[],
        setWorkspaces: any
    }
}

const initialData: WorkspaceContextType = {
    functions: {
        createWorkspace: () => { },
        editWorkspace: () => { },
        openWorkspace: () => { }
    },
    states: {
        setWorkspaces: () => { },
        workspaces: []
    }
}

export const WorkspaceContext = createContext<WorkspaceContextType>(initialData)