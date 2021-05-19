import { Avatar, Grid, Paper, Typography, Box } from "@material-ui/core"
import React, { useContext } from "react"
import { ThemeContext } from "../../ThemeContext"
import Chat from "../Chat"

function ChatElement(props)
{
    const context = useContext(ThemeContext)
    console.log(props.photo)

    let chat = <Chat name={props.friend} />

    let onClick = () => {
        props.loadChat(chat)
    }

    return (
        <Paper elevation={1} onClick={() => onClick()} style={{backgroundColor: context.palette.color, color: context.palette.textColor, cursor: "pointer", marginBottom: "1px"}} className="p-4">
            <Grid container>
                <Grid item xs={3} lg={2}>
                    <Box display="flex" alignItems="center" style={{height: "100%"}}>
                        <Avatar src={props.photo} />
                    </Box>
                </Grid>
                <Grid item xs={7} lg={8}>
                    <Typography variant="h5">{props.friend}</Typography>
                    <small>{props.lastMessage}</small>
                </Grid>
                <Grid item xs={1}>
                    {
                        props.online
                        ? <Box display="flex" alignItems="center" style={{height: "100%"}}><div style={{borderRadius: "50%", width: "12px", height: "12px", backgroundColor: "green"}}></div></Box>
                        : null
                    }
                </Grid>
            </Grid>
        </Paper>
    )
}

export default ChatElement