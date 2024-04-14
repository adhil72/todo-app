"use client";

import {HomeContext} from "./context";
import Home from "@/Components/Feature/Home/Home";
import {useCallback, useEffect, useMemo, useState} from "react";
import {useParams} from "next/navigation";
import {CircularProgress} from "@mui/material";
import Page from "@/Components/Common/Page";
import {BoardProps} from "@/Components/Feature/Home/Components/TaskPanel";
import {v4} from "uuid";
import {TaskItemProps} from "@/Components/Feature/Home/Components/TaskItem";
import {fetchBoard, fetchTask, saveBoard, saveTask} from "@/Firebase/db";

export default function Index() {

    const [boards, setBoards] = useState<BoardProps[]>([])
    const [tasks, setTasks] = useState<TaskItemProps[]>([])
    const [workspace, setWorkspace] = useState("")
    const [fetched, setFetched] = useState(false)
    const params = useParams()

    const createNewBoard = useCallback(() => {
        setBoards((prev) => {
            const modified = [...prev, {
                title: "New Board", tasks: [], id: v4(), workspaceId: workspace
            }]
            saveBoard(modified)
            return modified as any
        });
    }, [workspace, setBoards]);

    const createNewTask = useCallback((boardId: string) => {
        setTasks((prev) => {
            const modified = [...prev, {
                title: "New Task",
                description: "Enter description here",
                tag: "green:::TAG",
                theme: "blue",
                comments: 0,
                priority: "low",
                deadline: new Date().toString(),
                id: v4(),
                boardId
            }]
            saveTask(modified)
            return modified as any
        })
    }, [])

    const editTask = useCallback((data: TaskItemProps, id: string) => {
        setTasks((prev) => {
            let index = prev.findIndex((task) => task.id === id)
            prev[index] = data
            saveTask(prev)
            return prev
        })
    }, [])

    const editBoard = useCallback((id: string, data: BoardProps) => {
        setBoards((prev) => {
            const index = prev.findIndex((board) => board.id === id)
            prev[index] = data
            saveBoard(prev)
            return prev
        })
    }, [])

    const changeBoardOfTask = useCallback((taskId: string, boardId: string) => {
        setTasks((prev) => {
            const modified = prev.map((task) => {
                if (task.id === taskId) {
                    task.boardId = boardId
                }
                return task
            })
            saveTask(modified)
            return modified
        })

    },[])

    useEffect(() => {
        if (params.id) {
            setWorkspace(params.id + '')
            fetchBoard().then((d) => {
                setBoards(d || [])
                fetchTask().then((t) => {
                    setTasks(t || [])
                    setFetched(true)
                })
            })

        }
    }, [params.id]);

    const contextData: any = useMemo(() => ({
        functions: {
            createNewBoard, createNewTask, editTask, editBoard,changeBoardOfTask
        }, states: {
            boards, setBoards, tasks, setTasks, workspace, setWorkspace
        }
    }), [boards, setBoards, createNewBoard, createNewTask, tasks, setTasks, workspace, setWorkspace, editTask, editBoard,changeBoardOfTask])

    if (workspace === "") {
        return <Page style={{display: 'flex', alignItems: 'center', justifyContent: "center"}}>
            <CircularProgress/>
        </Page>
    }

    return <HomeContext.Provider value={contextData}>
        <Home/>
    </HomeContext.Provider>
}