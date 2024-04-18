import Text from '@/Components/Common/Text'
import Line from '@/Components/Common/Line'
import ProfileImage from '@/Components/Feature/ProfileImage/ProfileImage'
import { IconButton } from '@mui/material'
import { Logout, PersonRounded } from '@mui/icons-material'
import { auth } from '@/Firebase/config'
import { useContext } from 'react'
import { AppContext } from '../../../../app/AppContext'

export default function AppBar() {
    const {
        functions: { logout },
    } = useContext(AppContext)

    return (
        <div style={{ background: 'white!important' }}>
            <div style={{ padding: '20px', display: 'flex', justifyContent: 'right', alignItems: 'center' }}>
                <Text bold={true} size={1.8} style={{ visibility: 'hidden' }}>
                    TODO
                </Text>
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'start',
                        padding: '10px',
                        alignItems: 'center',
                        border: 'none 1px',
                        borderColor: 'gery',
                        background: '#f2f2f2',
                        borderRadius: '30px',
                    }}
                >
                    <ProfileImage size={2.5} />
                    <div>
                        <Text size={1} bold={true} style={{ color: 'black', marginLeft: '5px' }}>
                            {auth.currentUser?.displayName}
                        </Text>
                        <Text size={0.8} style={{ color: 'black', marginLeft: '5px' }}>
                            {auth.currentUser?.email}
                        </Text>
                    </div>
                    <IconButton onClick={logout}>
                        <Logout />
                    </IconButton>
                </div>
            </div>
        </div>
    )
}
