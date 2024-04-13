"use client";

import Workspace, { WorkspaceType } from "@/Components/Feature/Workspace/Workspace";
import { WorkspaceContext, WorkspaceContextType } from "./context";
import { useContext, useEffect, useMemo, useState } from "react";
import { v4 } from "uuid";
import { createUserCollection, fetchWorkSpace, saveWorkspace } from "@/Firebase/db";
import { useRouter } from "next/navigation";

export default function Index() {

    const [workspaces, setWorkspaces] = useState<WorkspaceType[]>([])

    const nav = useRouter()

    const createWorkspace = () => {
        const id = v4()
        workspaces.push({
            title: "New Workspace",
            description: "Description",
            members: [],
            id
        })
        setWorkspaces([...workspaces])
        saveWorkspace(workspaces)
    }

    const editWorkspace = (id: string, ws: WorkspaceType) => {
        let index = workspaces.findIndex((w) => w.id === id)
        workspaces[index] = ws        
        setWorkspaces([...workspaces])
        saveWorkspace(workspaces)
    }

    const openWorkspace = (id: string) => {
        nav.push("/" + id)
    }

    useEffect(() => {
        fetchWorkSpace().then((data) => {
            setWorkspaces(data);
        })
    }, [])



    const contextData: WorkspaceContextType = useMemo(() => ({
        functions: { createWorkspace, editWorkspace, openWorkspace },
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