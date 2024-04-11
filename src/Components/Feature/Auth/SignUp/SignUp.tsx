import Page from "@/Components/Common/Page";
import Text from "@/Components/Common/Text";
import Input from "@/Components/Common/Input";
import Button from "@/Components/Common/Button";
import {Divider} from "@mui/material";
import {useContext} from "react";
import {SignUpContext} from "../../../../../app/auth/signup/context";

export default function SignUp() {
    const { functions:{
        signUp
    }} = useContext(SignUpContext)
    function handleFormSubmit(e:React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        let target = e.target as any
        let name = target[0].value
        let email = target[2].value
        let password = target[4].value
        signUp(name,email,password)
    }

    return <Page style={{display:"flex",alignItems:"center",justifyContent:"center"}}>
        <center style={{padding:"2rem",background:"white",borderRadius:"30px",width:"350px"}}>
            <img src={"https://static-00.iconduck.com/assets.00/todo-icon-483x512-culjjebu.png"} style={{width:"100px"}}/>
            <br/>
            <Text size={1.6} bold={true}>Login</Text>
            <Text color={"grey"}>Enter your phone number to continue</Text>
            <form onSubmit={handleFormSubmit} style={{margin:"10px"}}>
                <Input label={"Name"} type={"text"} fullWidth/>
                <Input label={"Email"} type={"email"} sx={{mt:1}} fullWidth/>
                <Input label={"Password"} type={"password"} sx={{mt:1}} fullWidth/>
                <Button variant={"contained"} type={"submit"} style={{width:"100%",marginTop:"5px"}}>Sign in</Button>
            </form>
            <Text color={"grey"} size={0.8} style={{marginTop:"5px"}}>By continuing, you agree to our Terms of Service and Privacy Policy</Text>
            <Divider sx={{mt:1,mb:1}}/>
            <Text color={"grey"} size={0.8} style={{marginTop:"5px"}}>Already have an account? <a href={"/auth/signin"}>Sign in</a></Text>
        </center>
    </Page>
}