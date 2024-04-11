import {createContext} from "react";

export interface HomeContextType {
    states: {},
    functions: {}
}

const initialState: HomeContextType = {
    functions:{},
    states:{}
}

export const HomeContext = createContext<HomeContextType>(initialState);