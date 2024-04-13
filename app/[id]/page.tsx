"use client";

import { TaskItemProps } from "@/Components/Feature/Home/Components/TaskItem";
import { HomeContext, HomeContextType } from "./context";
import Home from "@/Components/Feature/Home/Home";
import { useContext, useEffect, useMemo, useState } from "react";
import { BoardProps } from "@/Components/Feature/Home/Components/TaskPanel";
import { v4 } from "uuid"
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

    const arrangeId1AboveId2 = (id1: string, id2: string, boardId: string) => {

    }

    const changeBoardOfTask = (taskId: string, from: string,to:string) => {
        const fromBoardIndex = boards.findIndex((b) => b.id === from)
        const toBoardIndex = boards.findIndex((b) => b.id === to)
        const fromBoard = boards[fromBoardIndex]
        const toBoard = boards[toBoardIndex]
        const taskIndex = fromBoard.tasks.findIndex((t) => t.id === taskId)
        const task = fromBoard.tasks[taskIndex]
        fromBoard.tasks.splice(taskIndex, 1)
        toBoard.tasks.push(task)
        setBoards((prev) => {
            const newBoards = [...prev]
            newBoards[fromBoardIndex] = fromBoard
            newBoards[toBoardIndex] = toBoard
            return newBoards
        })
        // saveBoard(boards)
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
        }
    }, [params.id])

    const contextData: HomeContextType = useMemo(
        () => ({
            functions: {
                arrangeId1AboveId2,
                createNewBoard,
                createNewTask,
                editTask,
                changeBoardOfTask
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