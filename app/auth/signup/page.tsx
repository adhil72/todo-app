'use client'

import { SignUpContextType, SignUpContext } from './context'
import { useContext, useMemo } from 'react'
import SignUp from '@/Components/Feature/Auth/SignUp/SignUp'
import { signUpService } from '@/Firebase/functions'
import { AppContext } from '../../AppContext'

export default function Index() {
    const appCtx = useContext(AppContext)

    const signUp = (name: string, email: string, password: string) => {
        appCtx.states.setProgressing(true)
        signUpService(name, email, password)
            .then((res) => {
                window.location.href = '/auth/verify'
                appCtx.states.setProgressing(false)
            })
            .catch((err) => {
                appCtx.states.setProgressing(false)
                console.log(err)
            })
    }

    const contextData: SignUpContextType = useMemo(
        () => ({
            functions: {
                signUp,
            },
            states: {},
        }),
        []
    )

    return (
        <SignUpContext.Provider value={contextData}>
            <SignUp />
        </SignUpContext.Provider>
    )
}
