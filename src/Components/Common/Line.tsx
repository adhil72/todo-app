import React from "react";

interface props{
    vertical: boolean
    size?: number
}
export default function Line(props:props & React.HTMLProps<HTMLDivElement>){
    return <div style={{
        width:props.vertical?"1px":props.size+"%",
        height:props.vertical?"100vh":"1px",
        background:"#eef2f6",
        position:"fixed",
        ...props.style
    }}></div>
}