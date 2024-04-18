import Page from '@/Components/Common/Page'
import ImgSecureAccount from '@/Assets/ImgSecureAccount'
import { Divider } from '@mui/material'
import Text from '@/Components/Common/Text'
import Button from '@/Components/Common/Button'
import { useContext } from 'react'
import { VerifyContext } from '../../../../../app/auth/verify/context'

export default function Verify() {
    const {
        functions: { resendVerificationLink },
    } = useContext(VerifyContext)
    return (
        <Page style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <center>
                <ImgSecureAccount style={{ width: '200px' }} />
                <h1>Verify your email</h1>
                <p>Check your email for a verification link</p>
                <Divider sx={{ mt: 1, mb: 1 }} />
                <Text color={'grey'} size={0.8} style={{ marginTop: '5px' }}>
                    Didn't get email? <Button onClick={() => resendVerificationLink()}>resend</Button>
                </Text>
            </center>
        </Page>
    )
}
