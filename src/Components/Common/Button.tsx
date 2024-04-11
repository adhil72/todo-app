import MuiButton from '@mui/material/Button';
export default function Button(props:React.ComponentProps<typeof MuiButton>){
    return <MuiButton {...props} sx={{...props.sx,borderRadius:"15px",padding:"10px"}}/>
}