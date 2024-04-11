"use client";

import {VerifyContext, VerifyContextType} from "./context";
import {useContext, useEffect, useMemo} from "react";
import Verify from "@/Components/Feature/Auth/Verify/Verify";
import {AppContext} from "../../AppContext";
import {isEmailVerified, sendEmailVerificationService} from "@/Firebase/functions";

export default function Index() {

    const appCtx = useContext(AppContext)

    useEffect(() => {
        appCtx.states.setProgressing(true)

        let verifier = setInterval(async () => {
            if (await isEmailVerified()) {
                appCtx.states.setProgressing(false)
                clearInterval(verifier)
                appCtx.functions.showMessage("Email verified")
                window.location.href = "/"
                return
            }
            return
        }, 1000);
    }, []);

    const resendVerificationLink = () => {
        sendEmailVerificationService().then(() => {
            appCtx.functions.showMessage("Verification link sent")
        })
    }


    const contextData: VerifyContextType = useMemo(() => ({
        functions: {
            resendVerificationLink
        }, states: {}
    }), [resendVerificationLink])

    return <VerifyContext.Provider value={contextData}>
        <Verify/>
    </VerifyContext.Provider>
}