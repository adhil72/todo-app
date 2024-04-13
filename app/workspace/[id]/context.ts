import { TaskItemProps } from "@/Components/Feature/Home/Components/TaskItem";
import { BoardProps } from "@/Components/Feature/Home/Components/TaskPanel";
import { createContext } from "react";

export interface HomeContextType {
    states: {
        boards: BoardProps[],
        setBoards: React.Dispatch<React.SetStateAction<BoardProps[]>>,
        draggingItem: any,
        setDraggingItem: React.Dispatch<React.SetStateAction<any>>,
        workspace: string,
        setWorkspace: React.Dispatch<React.SetStateAction<string>>
    },
    functions: {
        arrangeId1AboveId2: (id1: string, id2: string, boardId: string) => void,
        createNewBoard: () => void,
        createNewTask: (boardId: string) => void,
        editTask: (task: TaskItemProps, boardId: string) => void
    }
}

const initialState: HomeContextType = {
    functions: {
        arrangeId1AboveId2: () => { },
        createNewBoard: () => { },
        createNewTask: () => { },
        editTask: () => { }
    },
    states: {
        draggingItem: 1,
        setDraggingItem: () => 2,
        boards: [],
        setBoards: () => [],
        workspace: "",
        setWorkspace: () => ""
    }
}

export const HomeContext = createContext<HomeContextType>(initialState);