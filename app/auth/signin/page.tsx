'use client'

import { SignInContext, SignInContextType } from './context'
import { useContext, useMemo } from 'react'
import SignIn from '@/Components/Feature/Auth/SignIn/SignIn'
import { signInService } from '@/Firebase/functions'
import { AppContext } from '../../AppContext'

export default function Index() {
    const {
        states: { setProgressing },
    } = useContext(AppContext)

    const signIn = async (email: string, password: string) => {
        setProgressing(true)
        signInService(email, password)
            .then(() => {
                window.location.href = '/'
            })
            .finally(() => {
                setProgressing(false)
            })
    }

    const contextData: SignInContextType = useMemo(
        () => ({
            functions: {
                signIn,
            },
            states: {},
        }),
        [signIn]
    )

    return (
        <SignInContext.Provider value={contextData}>
            <SignIn />
        </SignInContext.Provider>
    )
}
