import { useState } from 'react';

interface TextProps {
    children?: React.ReactNode;
    style?: React.CSSProperties;
    size?: number;
    bold?: boolean;
    color?: string;
    editable?: boolean;
    onChanged?: (value: string) => void; // Add the onChanged prop
}

export default function Text({
    children,
    style,
    size = 1,
    bold,
    color,
    editable = false,
    onChanged, // Add the onChanged prop to the function arguments
}: TextProps) {
    const [isEditing, setIsEditing] = useState(false);
    const [textValue, setTextValue] = useState(children);

    const handleDoubleClick = () => {
        if (editable) {
            setIsEditing(true);
        }
    };

    const handleBlur = () => {
        setIsEditing(false);
        if (onChanged) {
            onChanged(textValue + ''); // Call the onChanged prop with the updated textValue
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTextValue(e.target.value);
    };


    return (
        <div style={{ ...style,cursor:"text" }} onClick={(e) => { if (editable) e.stopPropagation() }}>
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
                    }}
                    type="text"
                    value={textValue + ''}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    onKeyUp={(e) => { if (e.key === 'Enter') handleBlur() }}
                    autoFocus
                />
            ) : (
                <span
                    style={{
                        ...style,
                        color: color,
                        fontSize: `${size}rem`,
                        fontWeight: bold ? 'bold' : 'normal',
                    }}
                    onDoubleClick={handleDoubleClick}
                >
                    {textValue}
                </span>
            )}
        </div>
    );
}