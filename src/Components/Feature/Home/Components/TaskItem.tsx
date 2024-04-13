import Text from "@/Components/Common/Text";
import { CalendarMonthOutlined, CommentOutlined } from "@mui/icons-material";
import { Divider } from "@mui/material";
import { useContext, useEffect, useRef, useState } from "react";
import "./TaskItem.css";
import Paragraph from "@/Components/Common/Paragraph";
import { HomeContext } from "../../../../../app/[id]/context";
export interface TaskItemProps {
    title: string;
    description: string;
    tag: string;
    theme: string;
    comments: number;
    priority: 'high' | 'medium' | 'low';
    deadline: string;
    id: string;
    boardId?: string;
}

export default function TaskItem(data: TaskItemProps) {

    const {
        comments, deadline, description, boardId, tag, theme, title, id
    } = data;
    let ref = useRef(null);
    let editData = { ...data };
    const { states: { }, functions: { arrangeId1AboveId2, editTask } } = useContext(HomeContext);

    useEffect(() => {
        const div = document.getElementById(id);
        if(!div) return;
        div.ondragstart = (e:any) => {
            e.dataTransfer.setData("task", id);
            e.dataTransfer.setData("board", boardId);
        }
    }, [ref])


    return <div id={id} className="item" ref={ref} draggable style={{ border: "solid 1px", borderColor: "lightgrey", borderRadius: "7px", marginTop: "5px", cursor: "grab" }}>
        <div style={{ paddingLeft: "20px", paddingRight: "20px", paddingTop: "20px" }}>
            <Text onChanged={(change) => { editData.title = change; editTask(editData, boardId + '') }} editable size={1.3} bold={true}>{title.slice(0, 20)}{title.length > 20 ? "..." : ""}</Text>
            <Paragraph onChanged={(change) => { editData.description = change; editTask(editData, boardId + '') }} editable style={{ marginTop: "5px", width: '100%', color: "grey", textJustify: "auto", maxHeight: "50px", overflow: "hidden" }}>{description.slice(0, 40)}{description.length > 40 ? "..." : ""}</Paragraph>
        </div>
        <div style={{ display: "flex", justifyContent: 'space-between', alignItems: 'center', paddingLeft: "20px", paddingRight: "20px", paddingTop: "20px" }}>
            <div style={{ padding: "5px", fontWeight: "bold", borderRadius: "7px" }} className={tag.split(":::")[0]}>{tag.split(":::")[1]}</div>
            <div style={{ width: "1.5rem", height: "1.5rem", borderRadius: "100%" }} className={theme}></div>
        </div>
        <Divider sx={{ mt: "20px" }} />
        <div style={{ padding: "10px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div style={{ display: "flex", paddingLeft: "10px", alignItems: "center" }}>
                <CommentOutlined style={{ fontSize: "1.5rem", fill: "lightgrey" }} />
                <Text style={{ marginLeft: "3px" }} size={1} color={"grey"}>{comments}</Text>
            </div>
            <div style={{ display: "flex", alignItems: "center", paddingRight: "10px" }}>
                <CalendarMonthOutlined sx={{ fontSize: "1.5rem", fill: "lightgray" }} />
                <Text style={{ paddingLeft: "3px" }} size={1} color={"grey"} bold={true}>{new Date(deadline).toLocaleDateString(undefined, { month: "short", day: "2-digit" })}</Text>
            </div>
        </div>
    </div>
}