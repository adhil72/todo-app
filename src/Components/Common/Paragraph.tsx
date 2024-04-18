import { useEffect, useState } from 'react'

interface ParagraphProps {
    children?: React.ReactNode
    style?: React.CSSProperties
    size?: number
    bold?: boolean
    color?: string
    editable?: boolean
    onChanged?: (value: string) => void // Add the onChanged prop
}

export default function Paragraph({
    children,
    style,
    size = 1,
    bold,
    color,
    editable = false,
    onChanged, // Add the onChanged prop to the function arguments
}: ParagraphProps) {
    const [isEditing, setIsEditing] = useState(false)
    const [textValue, setTextValue] = useState(children)

    const handleDoubleClick = () => {
        if (editable) {
            setIsEditing(true)
        }
    }

    const handleBlur = () => {
        setIsEditing(false)
        if (onChanged) {
            onChanged(textValue + '') // Call the onChanged prop with the updated textValue
        }
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTextValue(e.target.value)
    }

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Enter') {
                handleBlur()
            }
        }

        document.addEventListener('keydown', handleKeyDown)

        return () => {
            document.removeEventListener('keydown', handleKeyDown)
        }
    }, [isEditing])

    return (
        <div style={{ ...style, cursor: 'text', width: 'fit-content' }} onClick={(e) => e.stopPropagation()}>
            {isEditing ? (
                <input
                    style={{
                        ...style,
                        color: color,
                        fontSize: `${size}rem`,
                        fontWeight: bold ? 'bold' : 'normal',
                        border: 'none',
                        outline: 'none',
                        background: 'none',
                        width: 'fit-content',
                    }}
                    type="text"
                    value={textValue + ''}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    autoFocus
                />
            ) : (
                <div
                    style={{
                        ...style,
                        color: color,
                        fontSize: `${size}rem`,
                        fontWeight: bold ? 'bold' : 'normal',
                        width: 'fit-content',
                    }}
                    onDoubleClick={handleDoubleClick}
                >
                    {textValue}
                </div>
            )}
        </div>
    )
}
