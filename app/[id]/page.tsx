'use client'

import { HomeContext } from './context'
import Board from '@/Components/Feature/Board/Board'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { useParams } from 'next/navigation'
import { CircularProgress } from '@mui/material'
import Page from '@/Components/Common/Page'
import { BoardProps } from '@/Components/Feature/Board/Components/TaskPanel'
import { v4 } from 'uuid'
import { TaskItemProps } from '@/Components/Feature/Board/Components/TaskItem'
import { fetchBoard, fetchTask, saveBoard, saveTask } from '@/Firebase/db'
import { WorkspaceType } from '@/Components/Feature/Workspace/Workspace'

export default function Index() {
    const [boards, setBoards] = useState<BoardProps[]>([])
    const [tasks, setTasks] = useState<TaskItemProps[]>([])
    const [workspace, setWorkspace] = useState('')
    const [workspaceData, setWorkspaceData] = useState<WorkspaceType>({
        title: '',
        description: '',
        id: '',
        members: [],
    })
    const [fetched, setFetched] = useState(false)
    const params = useParams()
    const [selectedTask, setSelectedTask] = useState<TaskItemProps>()
    const [openEditTask, setOpenEditTask] = useState(false)

    const createNewBoard = useCallback(() => {
        setBoards((prev) => {
            const modified = [
                ...prev,
                {
                    title: 'New Board',
                    tasks: [],
                    id: v4(),
                    workspaceId: workspace,
                },
            ]
            saveBoard(modified)
            return modified as any
        })
    }, [workspace, setBoards])

    const createNewTask = useCallback((boardId: string) => {
        setTasks((prev) => {
            const modified = [
                ...prev,
                {
                    title: 'New Task',
                    description: 'Enter description here',
                    tag: 'green:::TAG',
                    theme: 'blue',
                    comments: 0,
                    priority: 'low',
                    deadline: new Date().toString(),
                    id: v4(),
                    boardId,
                },
            ]
            saveTask(modified)
            return modified as any
        })
    }, [])

    const editTask = useCallback(async (data: TaskItemProps, id: string, async?: boolean) => {
        if (async) {
            return new Promise((r) => {
                setTasks((prev) => {
                    let index = prev.findIndex((task) => task.id === id)
                    prev[index] = data
                    saveTask(prev).then(() => {
                        r(null)
                    })
                    return [...prev]
                })
            })
        } else {
            setTasks((prev) => {
                let index = prev.findIndex((task) => task.id === id)
                prev[index] = data
                saveTask(prev)
                return [...prev]
            })
        }
    }, [])

    const editBoard = useCallback(async (id: string, data: BoardProps) => {
        setBoards((prev) => {
            const index = prev.findIndex((board) => board.id === id)
            prev[index] = data
            saveBoard(prev)
            return prev
        })
    }, [])

    const changeBoardOfTask = useCallback(async (taskId: string, boardId: string) => {
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
    }, [])

    const openEditTaskPopup = useCallback((task: TaskItemProps) => {
        setSelectedTask(task)
        setOpenEditTask(true)
    }, [])

    const fetchTasks = useCallback(async () => {
        fetchTask().then((t) => {
            setTasks(t || [])
            setFetched(true)
        })
    }, [])

    useEffect(() => {
        if (params.id) {
            setWorkspace(params.id + '')
            fetchBoard().then((d) => {
                setBoards(d || [])
                fetchTasks()
            })
        }
    }, [params.id])

    const contextData: any = useMemo(
        () => ({
            functions: {
                workspaceData,
                setWorkspaceData,
                createNewBoard,
                fetchTasks,
                createNewTask,
                editTask,
                editBoard,
                changeBoardOfTask,
                openEditTaskPopup,
            },
            states: {
                boards,
                setBoards,
                tasks,
                setTasks,
                workspace,
                setWorkspace,
                selectedTask,
                setSelectedTask,
                openEditTask,
                setOpenEditTask,
            },
        }),
        [
            workspaceData,
            setWorkspaceData,
            openEditTaskPopup,
            boards,
            setBoards,
            createNewBoard,
            createNewTask,
            fetchTasks,
            tasks,
            setTasks,
            workspace,
            setWorkspace,
            selectedTask,
            setSelectedTask,
            editTask,
            editBoard,
            changeBoardOfTask,
            openEditTask,
            setOpenEditTask,
        ]
    )

    if (workspace === '') {
        return (
            <Page style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <CircularProgress />
            </Page>
        )
    }

    return (
        <HomeContext.Provider value={contextData}>
            <Board />
        </HomeContext.Provider>
    )
}
