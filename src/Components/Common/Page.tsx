interface PageProps {
    children?: React.ReactNode
    style?: React.CSSProperties
}
export default function Page({ children, style }: PageProps) {
    return <div style={{ width: '100%', height: '100vh', background: '#f2f2f2', ...style }}>{children}</div>
}
