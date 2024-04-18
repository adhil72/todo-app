interface TypeProps {
    color: 'red' | 'blue' | 'green' | 'yellow'
}
export default function ColorDisc({ color }: TypeProps & React.HTMLProps<HTMLDivElement>) {
    return (
        <div
            style={{
                width: '10px',
                height: '10px',
                background: color,
                borderRadius: '100%',
            }}
        ></div>
    )
}
