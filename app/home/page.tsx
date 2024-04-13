"use client";

import { TaskItemProps } from "@/Components/Feature/Home/Components/TaskItem";
import { HomeContext, HomeContextType } from "./context";
import Home from "@/Components/Feature/Home/Home";
import { useMemo, useState } from "react";
import { BoardProps } from "@/Components/Feature/Home/Components/TaskPanel";

export default function Index() {

    const [boards, setBoards] = useState<BoardProps[]>([
        {
            title: "Todo", tasks: [

                { id: "de12ed2ftc", title: "Create login page", comments: 0, deadline: new Date().toString(), description: "Hello tester", priority: "high", tag: "testing", theme: "red" },
                { id: "dqw3289*(", title: "Make the home page responsive", comments: 0, deadline: new Date().toString(), description: "Hello tester", priority: "high", tag: "testing", theme: "red" },
                { id: "asn8*(*(", title: "Bug fix", comments: 0, deadline: new Date().toString(), description: "Hello tester", priority: "high", tag: "testing", theme: "red" }

            ], id: "1"
        },
        { title: "In Progress", tasks: [], id: "2" },
        { title: "Done", tasks: [], id: "3" }
    ])
    const [draggingItem, setDraggingItem] = useState<any>()

    const createNewBoard = () => {
        setBoards((prev) => [...prev, { title: "New Board", tasks: [], id: Math.random().toString() }])
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
    }

    const createNewTask = (boardId: string) => {
        let sampleTask: TaskItemProps = {
            id: Math.random().toString(),
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
    }


    const contextData: HomeContextType = useMemo(
        () => ({
            functions: {
                arrangeId1AboveId2,
                createNewBoard,
                createNewTask
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