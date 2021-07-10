import { Avatar, Grid, Paper, Typography, Box } from "@material-ui/core"
import React, { useContext } from "react"
import { ThemeContext } from "../../ThemeContext"

function ChatElement(props)
{
    const context = useContext(ThemeContext)

    let onClick = () => {
        props.loadChat(props.chat)
    }

    let styleOnlineCircle = props.online
        ? {borderRadius: "50%", width: "12px", height: "12px", backgroundColor: "green"}
        : {borderRadius: "50%", width: "12px", height: "12px"};

    return (
        <Paper elevation={1} onClick={() => onClick()} style={{backgroundColor: context.palette.color, color: context.palette.textColor, cursor: "pointer", marginBottom: "1px"}} className="p-4">
            <Grid container className="w-100">
                <Grid item xs={4} lg={3}>
                    <Box display="flex" alignItems="center" style={{height: "100%"}}>
                        <Avatar src={props.photo} />
                    </Box>
                </Grid>
                <Grid item xs={7} lg={8}>
                    <Typography variant="h5">{props.friend}</Typography>
                    <div style={{overflow: "hidden", textOverflow: "ellipsis"}} className="w-100">
                        <Typography variant="caption" noWrap ref={props.lastMessageRef}>{props.lastMessage}</Typography>
                    </div>
                </Grid>
                <Grid item xs={1}>
                    <Box display="flex" justifyContent="center" alignItems="center" className="w-100 h-100">
                        <div
                            ref={props.onlineCircleRef}
                            style={styleOnlineCircle}
                        ></div>
                    </Box>
                </Grid>
            </Grid>
        </Paper>
    )
}

export default ChatElement