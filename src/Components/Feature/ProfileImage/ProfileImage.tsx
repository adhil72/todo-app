import { Person, Person2, Person2Rounded, PersonRounded } from '@mui/icons-material'
import Text from '@/Components/Common/Text'

interface propsType {
    size?: number
}
export default function ProfileImage(props: propsType & React.HTMLProps<HTMLDivElement>) {
    return (
        <div
            {...props}
            style={{
                width: props.size + 'rem',
                height: props.size + 'rem',
                ...props.style,
                border: 'solid 1px',
                borderRadius: '100%',
                borderColor: 'grey',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: '#bebebe',
            }}
        >
            <PersonRounded style={{ color: '#ffffff', width: '80%', height: '80%' }} />
        </div>
    )
}
