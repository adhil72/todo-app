
interface TextProps{
    children?: React.ReactNode;
    style?: React.CSSProperties;
    size?:number;
    bold?:boolean;
    color?:string;
}
export default function Text({children,style,size=1,bold,color}:TextProps){
    return <div style={{...style}}>
        <span style={{
            ...style,
            color: color,
            fontSize: `${size}rem`,
            fontWeight: bold ? "bold" : "normal"
        }}>{children}</span>
    </div>
}