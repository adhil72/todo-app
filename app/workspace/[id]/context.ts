import { TaskItemProps } from "@/Components/Feature/Home/Components/TaskItem";
import { BoardProps } from "@/Components/Feature/Home/Components/TaskPanel";
import { createContext } from "react";

export interface HomeContextType {
    states: {
        boards: BoardProps[],
        setBoards: React.Dispatch<React.SetStateAction<BoardProps[]>>,
        draggingItem: any,
        setDraggingItem: React.Dispatch<React.SetStateAction<any>>
    },
    functions: {
        arrangeId1AboveId2: (id1: string, id2: string, boardId: string) => void,
        createNewBoard: () => void,
        createNewTask: (boardId: string) => void
    }
}

const initialState: HomeContextType = {
    functions: {
        arrangeId1AboveId2: () => { },
        createNewBoard: () => { },
        createNewTask: () => { }
    },
    states: {
        draggingItem: 1,
        setDraggingItem: () => 2,
        boards: [],
        setBoards: () => []
    }
}

export const HomeContext = createContext<HomeContextType>(initialState);