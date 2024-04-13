import Page from "@/Components/Common/Page";
import Line from "@/Components/Common/Line";
import AppBar from "@/Components/Feature/AppBar/AppBar";
import Text from "@/Components/Common/Text";
import ProfileImage from "@/Components/Feature/ProfileImage/ProfileImage";
import { Divider } from "@mui/material";
import { CalendarMonth, CalendarMonthOutlined, CommentOutlined } from "@mui/icons-material";
import TaskPanel from "./Components/TaskPanel";
import { useContext, useState } from "react";
import { TaskItemProps } from "./Components/TaskItem";
import { HomeContext } from "../../../../app/home/context";
import Button from "@/Components/Common/Button";
import Input from "@/Components/Common/Input";

const members = [1, 2, 3, 4, 6, 7, 8, 5, 5, 3, 5, 7, 45, 7, 5]

export default function Home() {

    const { states: { boards }, functions: { createNewBoard } } = useContext(HomeContext)

    return (
        <Page style={{ background: "white!important", "height": "fit-content" }}>
            <Line vertical={true} />
            <AppBar />
            <div style={{ paddingLeft: "30px", paddingRight: "30px" }}>
                <Text size={2.5} bold={true}>
                    Vectorshades
                </Text>
                <Text style={{}} color={"grey"} size={0.8}>
                    /workspace/vectorshades
                </Text>
                <div style={{ display: "flex" }}>
                    {
                        members.slice(0, 3).map((m) => {
                            return <ProfileImage style={{ marginLeft: "-1rem" }} size={2} />
                        })
                    }
                </div>
            </div>
            <div style={{ padding: "10px" }}>
                <div style={{ width: "100%", display: "flex", overflowX: "auto" }}>
                    {
                        boards.map((board, i) => {
                            return <TaskPanel id={board.id} tasks={board.tasks} theme="red" title={board.title} />
                        })
                    }
                    <div style={{ flex: "0 0 auto", minWidth: "300px", maxWidth: "300px", borderRadius: "5px", margin: "0 5px" }}>
                        <div onClick={createNewBoard} className="clickable" style={{ width: "100%", alignItems: "center", cursor: "pointer" }}>
                            <Text size={1.2} style={{ margin: "7px" }}>New board</Text>
                        </div>
                    </div>
                </div>
            </div>
        </Page>
    );
}