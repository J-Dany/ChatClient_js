import { TextField, Box, IconButton, Grid, Typography } from "@material-ui/core"
import React from "react"
import { ThemeContext } from "../ThemeContext"
import SendIcon from '@material-ui/icons/Send'
import Message from "./functional/Message"

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
    }

    componentDidMount()
    {
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
        let url = `http://${this.connection.getWebServerIp()}/get-last-messages/${localStorage.getItem('id')}/${this.props.idFriend}/`

        let xml = new XMLHttpRequest()

        xml.onload = data => {
            if (xml.status === 200)
            {
                this.setState({
                    lastMessages: {
                        isLoading: false,
                        messages: JSON.parse(xml.responseText)
                    }
                })
            }
        }

        xml.open("GET", url, true)
        xml.send()
    }

    render()
    {
        return (
            <Box display="flex" flexDirection="column" className="h-100">
                <Box display="flex" flexDirection="column" className="mb-2 w-100">
                    {
                        this.state.lastMessages.isLoading
                        ? "Loading..."
                        : this.state.lastMessages.messages.map(value => {
                            if (value.sender.idUser === this.props.idFriend)
                            {
                                return <Box display="flex" justifyContent="flex-start" className="w-100 p-2">
                                    <Message message={value.message} data={value.data} />
                                </Box>
                            }
                            else if (value.sender.idUser === parseInt(localStorage.getItem('id')))
                            {
                                return <Box display="flex" justifyContent="flex-end" className="w-100 p-2">
                                    <Message message={value.message} data={value.data} />
                                </Box>
                            }
                        })
                    }
                </Box>
                <Grid container className="mt-auto w-100" >
                    <Grid item xs={10} md={11}>
                        <TextField fullWidth autoFocus variant="outlined" autoComplete="off" id="textMessage" />
                    </Grid>
                    <Grid item xs={2} md={1}>
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