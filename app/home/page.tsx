"use client";

import { TaskItemProps } from "@/Components/Feature/Home/Components/TaskItem";
import { HomeContext, HomeContextType } from "./context";
import Home from "@/Components/Feature/Home/Home";
import { useContext, useEffect, useMemo, useState } from "react";
import { BoardProps } from "@/Components/Feature/Home/Components/TaskPanel";
import { logoutService } from "@/Firebase/functions";
import { setEdited, setBoardsController, sync } from "@/Firebase/db";
import { v4 } from "uuid"
import { AppContext } from "../AppContext";
export default function Index() {

    const [boards, setBoards] = useState<BoardProps[]>([])
    const [draggingItem, setDraggingItem] = useState<any>()
    // const [fetched, setFetched] = useState(false)
    const { states: { setProgressing } } = useContext(AppContext)

    const onChanges = () => {
        setBoardsController(boards)
        setEdited(true)
    }

    const createNewBoard = () => {
        setBoards((prev) => [...prev, { title: "New Board", tasks: [], id: v4() }])
        onChanges()
    }

    const arrangeId1AboveId2 = (id1: string, id2: string, boardId: string) => {
        const boardIndex = boards.findIndex((b) => b.id === boardId)
        const board = boards[boardIndex]
        const taskIndex1 = board.tasks.findIndex((t) => t.id === id1)
        const taskIndex2 = board.tasks.findIndex((t) => t.id === id2)
        const task1 = board.tasks[taskIndex1]
        const task2 = board.tasks[taskIndex2]
        board.tasks[taskIndex1] = task2
        board.tasks[taskIndex2] = task1
        setBoards((prev) => {
            const newBoards = [...prev]
            newBoards[boardIndex] = board
            return newBoards
        })
        onChanges()
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
        onChanges()
    }

    const logout = () => {
        logoutService().then((done) => {
            window.location.href = "/"
        })
    }

    useEffect(() => {
        setProgressing(true)
        sync().then((boards) => {
            setBoards(boards)
        }).finally(() => {
            setProgressing(false)
        })
    }, [])



    const contextData: HomeContextType = useMemo(
        () => ({
            functions: {
                arrangeId1AboveId2,
                createNewBoard,
                createNewTask,
                logout
            },
            states: {
                boards,
                setBoards,
                draggingItem,
                setDraggingItem,
            }
        }),
        [
            boards,
            setBoards,
            draggingItem,
            setDraggingItem,
            createNewBoard
        ]
    )

    return <HomeContext.Provider value={contextData}>
        <Home />
    </HomeContext.Provider>
}