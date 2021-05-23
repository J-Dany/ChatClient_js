import { TextField, Box, IconButton, Grid, Typography } from "@material-ui/core"
import React from "react"
import { ThemeContext } from "../ThemeContext"
import SendIcon from '@material-ui/icons/Send'
import MessageList from "./functional/MessageList"

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
        let message = document.getElementById("textMessage")

        if (this.state.isFriend)
        {
            let mes = this.connection.sendToFriend(
                this.state.friendName,
                message.value
            )

            message.value = ""
            message.focus()

            this.props.updateMessages(this.state.friendName, this.state.groupName, {
                data: mes.Data,
                message: mes.Message,
                isFriendSender: false
            })
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
                let json = JSON.parse(xml.responseText)

                for (let j in json)
                {
                    console.log(json[j])
                    let message = {
                        message: json[j].message,
                        data: json[j].data,
                        isFriendSender: json[j].sender.idUser === parseInt(this.props.idFriend)
                            ? true
                            : false
                    }

                    console.log(message)

                    this.props.updateMessages(this.state.friendName, this.state.groupName, message)
                }
            }
        }

        xml.open("GET", url, true)
        xml.send()
    }

    render()
    {
        return (
            <Box display="flex" flexDirection="column" className="h-100">
                <Box display="flex" flexDirection="column" className="mb-2 w-100 " style={{overflowY: 'scroll'}}>
                    <MessageList messages={this.props.messages} />
                </Box>
                <Grid container className="mt-auto w-100 p-1" >
                    <Grid item xs={10} md={11}>
                        <TextField 
                            fullWidth 
                            autoFocus 
                            variant="outlined" 
                            autoComplete="off" 
                            id="textMessage"
                            inputProps={
                                {
                                    style: {
                                        color: this.props.palette.textColor
                                    }
                                }
                            }
                        />
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