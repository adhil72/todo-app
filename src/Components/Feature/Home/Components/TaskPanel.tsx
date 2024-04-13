import Text from "@/Components/Common/Text";
import { Divider } from "@mui/material";
import TaskItem, { TaskItemProps } from "./TaskItem";
import Button from "@/Components/Common/Button";
import { useContext } from "react";
import { HomeContext } from "../../../../../app/workspace/[id]/context";

interface props {
    title: string;
    theme: 'red' | 'blue' | 'green';
    tasks: TaskItemProps[]
    id: string;
}
export interface BoardProps {
    title: string;
    tasks: TaskItemProps[];
    id: string;
    workspaceId: string;
}
export default function TaskPanel({ theme, title, tasks, id }: props) {

    const { functions: { createNewTask } } = useContext(HomeContext)

    return (
        <div style={{ flex: "0 0 auto", minWidth: "300px", maxWidth: "300px", borderRadius: "5px", margin: "0 5px" }}>
            <div style={{ width: "100%", display: "flex", alignItems: "center", background: "#ffc1bd" }}>
                <Text size={1.2} style={{ margin: "7px" }}>{title}</Text>
            </div>
            <Divider sx={{ background: theme, height: "3px" }} />
            <div style={{ width: "100%", marginTop: "10px", overflowY: "auto" }}>
                <div style={{ border: "solid 1px", borderColor: "lightgrey", borderRadius: "7px", marginTop: "5px", cursor: "grab" }}>
                    <Button onClick={() => createNewTask(id)} style={{ width: "100%", padding: "10px" }} variant="text">Add Task</Button>
                </div>
                {tasks.map((data, i) => <TaskItem key={i} {...data} boardId={id} />)}
            </div>
        </div>
    );
}
