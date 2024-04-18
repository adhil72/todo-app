import React from 'react'
import { TextField } from '@mui/material'

export default function Input(props: React.ComponentProps<typeof TextField>) {
    return (
        <TextField
            {...props}
            sx={{
                '& .MuiOutlinedInput-root': {
                    borderRadius: '16px',
                },
                ...props.sx,
            }}
        />
    )
}
