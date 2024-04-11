"use client";

import React, { PropsWithChildren, useMemo, useState } from "react";
import { LinearProgress, Snackbar } from "@mui/material";
import Page from "@/Components/Common/Page";
import SideBar from "@/Components/SideBar/SideBar";
import { AppContext, AppContextType } from "./AppContext";

export default function AppLayout({ children }: PropsWithChildren<{}>) {
    const [progressing, setProgressing] = useState<boolean>(false);
    const [openSnackbar, setOpenSnackbar] = useState<boolean>(false);
    const [snackbarMessage, setSnackbarMessage] = useState<string>("");

    const showMessage = (message: string) => {
        setSnackbarMessage(message);
        setOpenSnackbar(true);
    };

    const contextData: AppContextType = useMemo(
        () => ({
            functions: {
                showMessage,
            },
            states: {
                setProgressing,
                progressing,
            },
        }),
        [setProgressing, progressing, showMessage]
    );

    return (
        <AppContext.Provider value={contextData}>
            <Page>
                {progressing && (
                    <LinearProgress
                        style={{ position: "absolute", top: 0, left: 0, right: 0, zIndex: 1 }}
                    />
                )}
                <div style={{ display: "flex", height: "100vh" }}>
                    <div style={{ flex: "15%", height: "100%", overflowY: "auto" }}>
                        <SideBar />
                    </div>
                    <div style={{ flex: "85%", height: "100%", overflowY: "auto" }}>
                        {children}
                    </div>
                </div>
                <Snackbar
                    open={openSnackbar}
                    autoHideDuration={4000}
                    onClose={() => setOpenSnackbar(false)}
                    message={snackbarMessage}
                />
            </Page>
        </AppContext.Provider>
    );
}
