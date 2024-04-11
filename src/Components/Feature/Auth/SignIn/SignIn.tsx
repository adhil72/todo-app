import Page from "@/Components/Common/Page";
import Text from "@/Components/Common/Text";
import Input from "@/Components/Common/Input";
import Button from "@/Components/Common/Button";
import {Divider} from "@mui/material";

export default function SignIn() {
    return <Page style={{display:"flex",alignItems:"center",justifyContent:"center"}}>
        <center style={{padding:"2rem",background:"white",borderRadius:"30px",width:"350px"}}>
            <img src={"https://static-00.iconduck.com/assets.00/todo-icon-483x512-culjjebu.png"} style={{width:"100px"}}/>
            <br/>
            <Text size={1.6} bold={true}>Login</Text>
            <Text color={"grey"}>Enter your phone number to continue</Text>
            <form style={{margin:"10px"}}>
                <Input label={"Email"} type={"email"} fullWidth/>
                <Input label={"Password"} type={"password"} sx={{mt:1}} fullWidth/>
                <Button variant={"contained"} style={{width:"100%",marginTop:"5px"}}>Sign in</Button>
            </form>
            <Text color={"grey"} size={0.8} style={{marginTop:"5px"}}>By continuing, you agree to our Terms of Service and Privacy Policy</Text>
            <Divider sx={{mt:1,mb:1}}/>
            <Text color={"grey"} size={0.8} style={{marginTop:"5px"}}>Don't have an account? <a href={"/auth/signup"}>Sign up</a></Text>
        </center>
    </Page>
}