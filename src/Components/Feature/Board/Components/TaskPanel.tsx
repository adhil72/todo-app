import Text from '@/Components/Common/Text'
import { Divider } from '@mui/material'
import TaskItem, { TaskItemProps } from './TaskItem'
import Button from '@/Components/Common/Button'
import { useContext, useEffect, useState } from 'react'
import { HomeContext } from '../../../../../app/[id]/context'

interface props {
    board: BoardProps
}

export interface BoardProps {
    title: string
    id: string
    workspaceId: string
    theme: string
}

export default function TaskPanel({ board }: props) {
    const { theme = 'red', title, id } = board
    const editData = { ...board }

    const {
        functions: { createNewTask, changeBoardOfTask, editBoard },
        states: { tasks },
    } = useContext(HomeContext)
    const [boardTasks, setBoardTasks] = useState<TaskItemProps[]>([])

    useEffect(() => {
        setBoardTasks(tasks.filter((task: TaskItemProps) => task.boardId === id))
    }, [tasks, id])

    const onDrop = (e: any) => {
        const task = e.dataTransfer.getData('task')
        const board = e.dataTransfer.getData('board')

        let b = e.target
        while (b.className !== 'board') {
            b = b.parentElement
        }
        b.style.background = 'none'

        if (board === id) return

        changeBoardOfTask(task, id)
    }

    const onDragOver = (e: any) => {
        e.preventDefault()
        let b = e.target
        while (b.className !== 'board') {
            b = b.parentElement
        }
        b.style.background = 'lightgrey'
    }

    const onDragLeave = (e: any) => {
        let b = e.target
        while (b.className !== 'board') {
            b = b.parentElement
        }
        b.style.background = 'none'
    }

    return (
        <div
            className={'board'}
            onDropCapture={onDrop}
            onDragOver={onDragOver}
            onDragLeave={onDragLeave}
            style={{
                transition: '0.3s',
                flex: '0 0 auto',
                padding: '10px',
                minWidth: '300px',
                maxWidth: '300px',
                borderRadius: '5px',
                margin: '0 5px',
            }}
        >
            <div draggable style={{ width: '100%', display: 'flex', alignItems: 'center', background: '#ffc1bd' }}>
                <Text
                    onChanged={(change) => {
                        editData.title = change
                        editBoard(id, editData)
                    }}
                    editable
                    size={1.2}
                    style={{ margin: '7px' }}
                >
                    {title}
                </Text>
            </div>
            <Divider sx={{ background: theme, height: '3px' }} />
            <div style={{ width: '100%', marginTop: '10px', overflowY: 'auto' }}>
                <div
                    style={{
                        border: 'solid 1px',
                        borderColor: 'lightgrey',
                        borderRadius: '7px',
                        marginTop: '5px',
                        cursor: 'grab',
                        background: 'white',
                    }}
                >
                    <Button onClick={() => createNewTask(id)} style={{ width: '100%', padding: '10px' }} variant="text">
                        Add Task
                    </Button>
                </div>
                {boardTasks.map((data: TaskItemProps, i: number) => (
                    <TaskItem key={i} {...data} boardId={id} />
                ))}
            </div>
        </div>
    )
}
