"use client"

import Page from "@/Components/Common/Page";
import {LinearProgress, Snackbar} from "@mui/material";
import {AppContext, AppContextType} from "./AppContext";
import {useMemo, useState} from "react";

export default function AppLayout({children}:React.PropsWithChildren<{}>){
    const [progressing, setProgressing] = useState(false)
    const [openSnackbar, setOpenSnackbar] = useState(false)
    const [snackbarMessage, setSnackbarMessage] = useState("")

    const showMessage = (message:string) => {
        setSnackbarMessage(message)
        setOpenSnackbar(true)
    }

    const contextData:AppContextType = useMemo(()=>({
        functions:{
            showMessage
        },
        states:{
            setProgressing,
            progressing
        }
    }),[setProgressing,progressing,showMessage])

    return <AppContext.Provider value={contextData}>
        <Page>
            {progressing && <LinearProgress style={{ position: "absolute", top: 0, left: 0, right: 0, zIndex: 1 }} />}
            {children}
            <Snackbar
                open={openSnackbar}
                autoHideDuration={4000}
                onClose={()=>setOpenSnackbar(false)}
                message={snackbarMessage}
            />
        </Page>
    </AppContext.Provider>
}