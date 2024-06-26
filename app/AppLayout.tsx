'use client'

import React, { PropsWithChildren, useEffect, useMemo, useState } from 'react'
import { CircularProgress, LinearProgress, Snackbar } from '@mui/material'
import Page from '@/Components/Common/Page'
import SideBar from '@/Components/SideBar/SideBar'
import { AppContext, AppContextType } from './AppContext'
import { getUserDetails, logoutService } from '@/Firebase/functions'
import { WorkspaceType } from '@/Components/Feature/Workspace/Workspace'

export default function AppLayout({ children }: PropsWithChildren<{}>) {
    const [progressing, setProgressing] = useState<boolean>(true)
    const [openSnackbar, setOpenSnackbar] = useState<boolean>(false)
    const [snackbarMessage, setSnackbarMessage] = useState<string>('')
    const [fetched, setFetched] = useState(false)

    const showMessage = (message: string) => {
        setSnackbarMessage(message)
        setOpenSnackbar(true)
    }

    const logout = () => {
        logoutService().then((done) => {
            window.location.href = '/'
        })
    }

    const contextData: AppContextType = useMemo(
        () => ({
            functions: {
                showMessage,
                logout,
            },
            states: {
                setProgressing,
                progressing,
            },
        }),
        [setProgressing, progressing, showMessage, logout]
    )

    useEffect(() => {
        getUserDetails().then((user) => {
            if (!user && window.location.pathname !== '/auth/signin' && window.location.pathname !== '/auth/signup') {
                window.location.href = '/auth/signin'
            }
            setFetched(true)
            setProgressing(false)
        })
    }, [])

    if (!fetched)
        return (
            <Page style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <CircularProgress />
            </Page>
        )
    if (window.location.pathname.includes('auth'))
        return (
            <AppContext.Provider value={contextData}>
                <Page style={{ background: 'white' }}>
                    <LinearProgress
                        id="pb"
                        style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            right: 0,
                            zIndex: 1,
                            display: progressing ? 'block' : 'none',
                        }}
                    />
                    {children}
                    <Snackbar
                        open={openSnackbar}
                        autoHideDuration={4000}
                        onClose={() => setOpenSnackbar(false)}
                        message={snackbarMessage}
                    />
                </Page>
            </AppContext.Provider>
        )
    return (
        <AppContext.Provider value={contextData}>
            <Page style={{ background: 'white' }}>
                <LinearProgress
                    id="pb"
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        zIndex: 1,
                        display: progressing ? 'block' : 'none',
                    }}
                />
                <div style={{ display: 'flex', height: '100vh' }}>
                    <div style={{ flex: '15%', height: '100%', overflowY: 'auto' }}>
                        <SideBar />
                    </div>
                    <div style={{ flex: '85%', height: '100%', overflowY: 'auto' }}>{children}</div>
                </div>
                <Snackbar
                    open={openSnackbar}
                    autoHideDuration={4000}
                    onClose={() => setOpenSnackbar(false)}
                    message={snackbarMessage}
                />
            </Page>
        </AppContext.Provider>
    )
}
