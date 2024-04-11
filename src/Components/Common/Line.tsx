import React from "react";

interface props{
    vertical: boolean

}
export default function Line(props:props & React.HTMLProps<HTMLDivElement>){
    return <div style={{
        width:props.vertical?"1px":"100%",
        height:props.vertical?"100vh":"1px",
        background:"#eef2f6",
        ...props.style
    }}></div>
}