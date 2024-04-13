import Text from "@/Components/Common/Text";
import Line from "@/Components/Common/Line";
import { HomeMaxOutlined, HomeOutlined, HomeRounded } from "@mui/icons-material";
import HomeIcon from "@/Assets/HomeIcon";
import GroupIcon from "@/Assets/GroupIcon";
import { Button } from "@mui/material";
import ColorDisc from "@/Components/Common/ColorDisc";

export default function SideBar() {
    const items: { name: string, icon: any, path: string }[] = [
        { name: "Home", icon: <HomeIcon size={29} />, path: "/" },
        { name: "Group", icon: <GroupIcon size={29} />, path: "/group" },
    ]

    const workspace = [
        { name: "Personal", color: "green" },
        { name: "Work", color: "blue" },
        { name: "Family", color: "red" },
        { name: "Friends", color: "yellow" },
    ]

    return <div style={{ width: "100%", height: "100vh", background: "#ffffff", }}>
        <div style={{ padding: "20px" }}>
            <Text bold={true} size={1.8} style={{ color: "black" }}>TODO</Text>
        </div>

        <Line vertical={false} size={15} />

        <div style={{ padding: "20px" }}>
            {
                items.map(({ name, icon }, index) => {
                    return <Button key={index} fullWidth={true} style={{ display: "flex", fill: "#94A3B8", color: "#94A3B8", alignItems: "center", padding: "10px", justifyContent: "start", borderRadius: "15px", textTransform: "none" }}>
                        {icon}
                        <Text size={1} style={{ marginLeft: "5px" }}>{name}</Text>
                    </Button>
                })
            }
        </div>

        <Line vertical={false} size={15} />

        <div style={{ padding: "20px" }}>
            <Text size={1} bold={true} color={"#94A3B8"}>Workspace</Text>
        </div>
        <div style={{ padding: "20px" }}>
            {workspace.map(({ name, color }, index) => {
                return <Button key={index} style={{ display: "flex", alignItems: "center", textTransform: "none", color: "black", justifyContent: "start" }} fullWidth={true}>
                    <ColorDisc color={color as any} />
                    <Text size={1} style={{ marginLeft: "10px" }}>{name}</Text>
                </Button>
            })}
        </div>

    </div>
}