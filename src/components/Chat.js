import { TextField, Box, IconButton, Grid } from "@material-ui/core"
import React from "react"
import { ThemeContext } from "../ThemeContext"
import SendIcon from '@material-ui/icons/Send'

class Chat extends React.Component
{
    static contextType = ThemeContext

    constructor(props)
    {
        super(props)

        this.state = {
            isFriend: props.isFriend,
            isGroup: props.isGroup,
            friendName: props.friendName,
            groupName: props.groupName,
            lastMessages: {
                isLoading: true
            }
        }

        this.connection = props.connection

        this.loadLastMessage()
    }

    sendMessage()
    {
        let message = document.getElementById("textMessage").value

        if (this.state.isFriend)
        {
            this.connection.sendToFriend(
                this.state.friendName,
                message
            )
        }
        else if (this.state.isGroup)
        {

        }
    }

    loadLastMessage()
    {
        
    }

    render()
    {
        return (
            <Box display="flex" flexDirection="column" className="h-100">
                <Box display="flex" className="mb-2">
                    {
                        this.state.lastMessages.isLoading
                        ? "Loading..."
                        : this.state.lastMessages.messages.map(value => value)
                    }
                </Box>
                <Grid container className="mt-auto w-100" >
                    <Grid item md={11}>
                        <TextField fullWidth autoFocus variant="outlined" id="textMessage" />
                    </Grid>
                    <Grid item md={1}>
                        <IconButton className="w-100" edge="end" style={{color: this.context.palette.textColor}} onClick={() => this.sendMessage()}>
                            <SendIcon style={{fontSize: "larger"}}/>
                        </IconButton>
                    </Grid>
                </Grid>
            </Box>
        )
    }
}

export default Chat