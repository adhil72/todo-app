import Text from "@/Components/Common/Text";
import { CalendarMonthOutlined, CommentOutlined } from "@mui/icons-material";
import { Divider } from "@mui/material";
import { useContext, useEffect, useRef, useState } from "react";
import { HomeContext } from "../../../../../app/home/context";
import "./TaskItem.css";
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

export default function TaskItem({
    comments, deadline, description, boardId, tag, theme, title, id
}: TaskItemProps) {

    let ref = useRef(null);
    const { states: { }, functions: { arrangeId1AboveId2 } } = useContext(HomeContext);

    useEffect(() => {
        const draggableDiv: any = document.getElementById(id);
        if (!draggableDiv) return;

        function addDragAndDropEvents(taskItem: any) {
            taskItem.addEventListener('dragstart', handleDragStart);
            taskItem.addEventListener('dragover', handleDragOver);
            taskItem.addEventListener('drop', handleDrop);
        }

        function handleDragStart(event: any) {
            event.target.style.opacity = '0.1';
            event.target.style.border = '2px dashed blue';
            event.dataTransfer.setData('id', event.target.id);
        }


        function handleDragOver(event: any) {
            event.preventDefault(); // Necessary for drop to work
        }

        function handleDrop(event: any) {
            event.preventDefault();
            let t = event.target;
            let i = event.srcElement.id
            while (t.className !== "item") {
                t = t.parentElement;
            }
            let sourceId = event.dataTransfer.getData('id');
            let targetId = t.id;
            arrangeId1AboveId2(sourceId, targetId, boardId || '1');
        }

        function handleDragEnd(event: any) {
            event.target.style.opacity = '1';
            event.target.style.border = '1px solid lightgrey';
        }

        addDragAndDropEvents(draggableDiv);
        draggableDiv.addEventListener('dragend', handleDragEnd);
        return () => {
            draggableDiv.removeEventListener('dragstart', handleDragStart);
            draggableDiv.removeEventListener('dragover', handleDragOver);
            draggableDiv.removeEventListener('drop', handleDrop);
            draggableDiv.removeEventListener('dragend', handleDragEnd);
        }
    }, [ref])


    return <div id={id} className="item" ref={ref} draggable style={{ border: "solid 1px", borderColor: "lightgrey", borderRadius: "7px", marginTop: "5px", cursor: "grab" }}>
        <div style={{ paddingLeft: "20px", paddingRight: "20px", paddingTop: "20px" }}>
            <Text size={1.3} bold={true}>{title.slice(0, 20)}{title.length > 20 ? "..." : ""}</Text>
            <div style={{ marginTop: "5px", width: '100%', color: "grey", textJustify: "auto", maxHeight: "50px", overflow: "hidden" }}>{description.slice(0, 40)}{description.length > 40 ? "..." : ""}</div>
        </div>
        <div style={{ display: "flex", justifyContent: 'space-between', alignItems: 'center', paddingLeft: "20px", paddingRight: "20px", paddingTop: "20px" }}>
            <div style={{ padding: "5px", fontWeight: "bold", borderRadius: "7px" }} className={tag.split(":::")[0]}>{tag.split(":::")[1]}</div>
            <circle style={{ width: "1.5rem", height: "1.5rem", borderRadius: "100%" }} className={theme}></circle>
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