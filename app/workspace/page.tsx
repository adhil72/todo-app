"use client";

import Workspace, { WorkspaceType } from "@/Components/Feature/Workspace/Workspace";
import { WorkspaceContext, WorkspaceContextType } from "./context";
import { useContext, useEffect, useMemo, useState } from "react";
import { v4 } from "uuid";
import { setDataController, setEdited, sync } from "@/Firebase/db";
import { AppContext } from "../AppContext";

export default function Index() {

    const { states: { workspaces, setWorkspaces } } = useContext(AppContext)

    const onChanges = () => {
        setDataController(workspaces)
        setEdited(true)
    }

    const createWorkspace = () => {
        const id = v4()
        workspaces[id] = {
            title: "Untitled",
            description: "Description",
            members: [],
            id
        }
        setWorkspaces({ ...workspaces })
        onChanges()
    }

    useEffect(() => {
        sync().then((data) => {
            setWorkspaces(data);
        })
    }, [])



    const contextData: WorkspaceContextType = useMemo(() => ({
        functions: { createWorkspace },
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