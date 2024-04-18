import { TaskItemProps } from "@/Components/Feature/Board/Components/TaskItem";
import { BoardProps } from "@/Components/Feature/Board/Components/TaskPanel";
import React, { createContext } from "react";
import { WorkspaceType } from "@/Components/Feature/Workspace/Workspace";

export interface HomeContextType {
    functions: {
        createNewBoard: () => void;
        fetchTasks: () => void;
        createNewTask: (boardId: string) => void;
        editTask: (data: TaskItemProps, id: string) => void;
        editBoard: (id: string, data: BoardProps) => void | Promise<void>;
        changeBoardOfTask: (taskId: string, boardId: string) => void | Promise<void>;
        openEditTaskPopup: (task: TaskItemProps) => void;
    };
    states: {
        boards: BoardProps[];
        setBoards: React.Dispatch<React.SetStateAction<BoardProps[]>>;
        tasks: TaskItemProps[];
        setTasks: React.Dispatch<React.SetStateAction<TaskItemProps[]>>;
        workspace: string;
        setWorkspace: React.Dispatch<React.SetStateAction<string>>;
        selectedTask?: TaskItemProps;
        setSelectedTask: React.Dispatch<React.SetStateAction<TaskItemProps | undefined>>;
        openEditTask: boolean;
        setOpenEditTask: React.Dispatch<React.SetStateAction<boolean>>;
        workspaceData: WorkspaceType;
        setWorkspaceData: React.Dispatch<React.SetStateAction<WorkspaceType>>;
    };
}

const initialState: HomeContextType = {
    functions: {
        createNewBoard: () => { },
        fetchTasks: () => { },
        createNewTask: () => { },
        editTask: () => { },
        editBoard: () => { },
        changeBoardOfTask: () => { },
        openEditTaskPopup: () => { }
    },
    states: {
        workspaceData: {
            id: "",
            description: "",
            members: [],
            title: ""
        },
        setWorkspaceData: () => { },
        boards: [],
        setBoards: () => { },
        tasks: [],
        setTasks: () => { },
        workspace: "",
        setWorkspace: () => { },
        selectedTask: undefined,
        setSelectedTask: () => { },
        openEditTask: false,
        setOpenEditTask: () => { }
    }
}

export const HomeContext = createContext<HomeContextType>(initialState);