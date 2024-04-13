"use client";

import { TaskItemProps } from "@/Components/Feature/Home/Components/TaskItem";
import { HomeContext, HomeContextType } from "./context";
import Home from "@/Components/Feature/Home/Home";
import { useContext, useEffect, useMemo, useState } from "react";
import { BoardProps } from "@/Components/Feature/Home/Components/TaskPanel";
import { v4 } from "uuid"
import { AppContext } from "../../AppContext";
import { fetchBoard, saveBoard } from "@/Firebase/db";
import Page from "@/Components/Common/Page";
import { CircularProgress } from "@mui/material";
import { useParams } from "next/navigation";
export default function Index() {

    const [boards, setBoards] = useState<BoardProps[]>([])
    const [draggingItem, setDraggingItem] = useState<any>()
    const [workspace, setWorkspace] = useState("")
    const params = useParams()

    const createNewBoard = () => {
        setBoards((prev) => [...prev, { title: "New Board", tasks: [], id: v4(), workspaceId: workspace }])
        saveBoard(boards)
    }

    useEffect(() => {
        console.log('changed');

    }, boards)

    const arrangeId1AboveId2 = (id1: string, id2: string, boardId: string) => {
        const boardIndex = boards.findIndex((b) => b.id === boardId)
        const board = boards[boardIndex]
        const taskIndex1 = board.tasks.findIndex((t) => t.id === id1)
        const taskIndex2 = board.tasks.findIndex((t) => t.id === id2)
        const task1 = board.tasks[taskIndex1]
        const task2 = board.tasks[taskIndex2]
        board.tasks[taskIndex1] = task2
        board.tasks[taskIndex2] = task1
        const newBoards = [...boards]
        newBoards[boardIndex] = board
        setBoards(newBoards)             
        // saveBoard(newBoards)
    }

    const createNewTask = (boardId: string) => {
        let sampleTask: TaskItemProps = {
            id: v4(),
            title: "New Task",
            comments: 0,
            deadline: new Date().toString(),
            description: "Description of the task",
            priority: "high",
            tag: "testing",
            theme: "red"
        }
        const boardIndex = boards.findIndex((b) => b.id === boardId)
        const board = boards[boardIndex]
        board.tasks.unshift(sampleTask) // Insert new task at the beginning of the array
        setBoards((prev) => {
            const newBoards = [...prev]
            newBoards[boardIndex] = board
            return newBoards
        })
        saveBoard(boards)
    }

    const editTask = (task: TaskItemProps, boardId: string) => {
        const boardIndex = boards.findIndex((b) => b.id === boardId)
        const board = boards[boardIndex]
        const taskIndex = board.tasks.findIndex((t) => t.id === task.id)
        board.tasks[taskIndex] = task
        setBoards((prev) => {
            const newBoards = [...prev]
            newBoards[boardIndex] = board
            return newBoards
        })
        saveBoard(boards)
    }

    useEffect(() => {
        if (params.id) {
            setWorkspace(params.id + '')
            fetchBoard().then((data) => {
                setBoards(data || [])
            })
            return
        }
    }, [params.id])

    const contextData: HomeContextType = useMemo(
        () => ({
            functions: {
                arrangeId1AboveId2,
                createNewBoard,
                createNewTask,
                editTask
            },
            states: {
                boards,
                setBoards,
                draggingItem,
                setDraggingItem,
                workspace,
                setWorkspace
            }
        }),
        [
            boards,
            setBoards,
            draggingItem,
            setDraggingItem,
            createNewBoard,
            workspace,
            setWorkspace
        ]
    )

    if (workspace === "") {
        return <Page style={{ display: 'flex', alignItems: 'center', justifyContent: "center" }}>
            <CircularProgress />
        </Page>
    }

    return <HomeContext.Provider value={contextData}>
        <Home />
    </HomeContext.Provider>
}