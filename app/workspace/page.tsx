"use client";

import Workspace, { WorkspaceType } from "@/Components/Feature/Workspace/Workspace";
import { WorkspaceContext, WorkspaceContextType } from "./context";
import { useMemo, useState } from "react";

export default function Index() {

    const [workspaces, setWorkspaces] = useState<WorkspaceType[]>([
        {title: "Workspace 1", description: "Lorem ipsum fene", members: ["1", "2"], id: "1"},
        {title: "Workspace 2", description: "Lorem ipsum fene", members: ["1", "2"], id: "2"},
    ])

    const contextData: WorkspaceContextType = useMemo(() => ({
        functions: {},
        states: {
            workspaces,
            setWorkspaces
        }
    }), [
        workspaces,
        setWorkspaces
    ])
    return <WorkspaceContext.Provider value={contextData}>
        <Workspace />
    </WorkspaceContext.Provider>
}