"use client";

import {SignInContext, SignInContextType} from "./context";
import {useMemo} from "react";
import SignIn from "@/Components/Feature/Auth/SignIn/SignIn";

export default function Index() {

    const contextData: SignInContextType = useMemo(() => ({
        functions: {}, states: {}
    }), [])

    return <SignInContext.Provider value={contextData}>
        <SignIn/>
    </SignInContext.Provider>
}