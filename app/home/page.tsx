"use client";

import {HomeContext, HomeContextType} from "./context";
import Home from "@/Components/Feature/Home/Home";
import {useMemo} from "react";

export default function Index() {

    const contextData:HomeContextType = useMemo(
        () => ({
            functions:{},
            states:{}
        }),
        []
    )

    return <HomeContext.Provider value={contextData}>
        <Home/>
    </HomeContext.Provider>
}