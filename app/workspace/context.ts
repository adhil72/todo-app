import { WorkspaceType } from "@/Components/Feature/Workspace/Workspace"
import { createContext } from "react"

export interface WorkspaceContextType {
    functions: {
        createWorkspace: any
    },
    states: {
        workspaces: WorkspaceType[],
        setWorkspaces: any
    }
}

const initialData: WorkspaceContextType = {
    functions: {
        createWorkspace: () => { }
    },
    states: {
        setWorkspaces: () => { },
        workspaces: []
    }
}

export const WorkspaceContext = createContext<WorkspaceContextType>(initialData)