import Line from "@/Components/Common/Line";
import Page from "@/Components/Common/Page";
import AppBar from "../AppBar/AppBar";
import Text from "@/Components/Common/Text";
import { Grid } from "@mui/material";
import ProfileImage from "../ProfileImage/ProfileImage";
import { useContext } from "react";
import { WorkspaceContext } from "../../../../app/workspace/context";

export interface WorkspaceType {
    title: string;
    description: string;
    members: string[];
    id: string;
}
export default function Workspace() {

    const { states: { workspaces } } = useContext(WorkspaceContext)

    return (
        <Page style={{ background: "white" }}>
            <Line vertical={true} />
            <AppBar />
            <div style={{ paddingLeft: "30px", paddingRight: "30px" }}>
                <Text size={2.5} bold={true}>
                    Workspace
                </Text>
                <Text style={{}} color={"grey"} size={0.8}>
                    /workspace/
                </Text>
            </div>
            <Grid rowSpacing={2} columnSpacing={2} container style={{ padding: "30px" }}>
                {
                    workspaces.map((ws) => {
                        return <Grid item lg={3} md={4} sm={6} xs={12}>
                            <div className="hover-expand" style={{ background: "#f2f2f2", padding: "15px", borderRadius: "15px", cursor: "pointer" }}>
                                <Text size={1.5} bold={true} style={{ overflow: "hidden" }}>{ws.title}</Text>
                                <p style={{ fontSize: "1rem", color: "grey", width: "100%", wordWrap: "break-word", overflow: 'hidden', height: "2rem" }}>{ws.description}</p>
                                <Text size={1.2} bold={true} style={{ overflow: "hidden" }}>Members</Text>
                                <ProfileImage size={2.4} />
                            </div>
                        </Grid>
                    })
                }
            </Grid>
        </Page>
    );
}