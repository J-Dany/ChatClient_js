import { TextField, Box, IconButton, Grid } from "@material-ui/core"
import React from "react"
import { ThemeContext } from "../ThemeContext"
import SendIcon from '@material-ui/icons/Send'
import MessageList from "./functional/MessageList"
import loading from "../icons/loading.svg"
import axios from "axios"

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
            },
            isLoadingMessage: false,
            messages: [ ]
        }

        this.connection = props.connection
    }

    componentDidMount()
    {
        this.loadLastMessage()
    }

    updateMessages(message)
    {
        let messages = this.state.messages.slice()

        messages.push(message)

        this.setState({
            messages: messages
        })
    }

    sendMessage()
    {
        let message = document.getElementById("textMessage")

        if (message.value.length === 0)
        {
            return
        }

        this.props.lastMessageRef.current.innerHTML = message.value

        if (this.props.isFriend)
        {
            let mes = this.connection.sendToFriend(
                this.props.friendName,
                message.value
            )

            message.value = ""
            message.focus()

            this.updateMessages({
                data: mes.Data,
                message: mes.Message,
                isFriendSender: false
            })
        }
        else if (this.props.isGroup)
        {

        }
    }

    loadLastMessage()
    {
        axios.get(`http://${this.connection.getWebServerIp()}/get-last-messages/${localStorage.getItem('id')}/${this.props.idFriend}`)
            .then(value => {
                let json = value.data

                console.log(json)

                for (let j of json)
                {
                    let message = {
                        message: j.message,
                        data: j.data,
                        isFriendSender: j.sender.idUser === parseInt(this.props.idFriend)
                            ? true
                            : false
                    }

                    this.updateMessages(message)
                }

                this.setState({
                    isLoadingMessage: true
                })
            })
    }

    handleKeyDown(event)
    {
        if (event.keyCode === 13)
        {
            this.sendMessage()
        }
    }

    render()
    {
        return (
            <Box display="flex" flexDirection="column" className="h-100">
                {this.state.isLoadingMessage
                ?  <Box display="flex" flexDirection="column" className="mb-2 p-3 w-100 " style={{overflowY: 'auto'}}>
                        <MessageList messages={this.state.messages} />
                    </Box>
                :   <Box display="flex" justifyContent="center" alignItems="center" className="h-100">
                        <img src={loading} alt="loading..." width="64" height="64" />
                    </Box>
                }
                
                <Grid container className="mt-auto w-100 p-2" >
                    <Grid item xs={11}>
                        <TextField
                            multiline
                            fullWidth
                            autoFocus
                            variant="outlined"
                            autoComplete="off"
                            id="textMessage"
                            inputProps={
                                {
                                    style: {
                                        color: this.props.palette.textColor,
                                        outline: 'none'
                                    }
                                }
                            }
                            onKeyDown={event => this.handleKeyDown(event)}
                        />
                    </Grid>
                    <Grid item xs={1}>
                        <Box display="flex" alignItems="center" justifyContent="center">
                            <IconButton className="w-75" edge="end" style={{color: this.context.palette.textColor}} onClick={() => this.sendMessage()}>
                                <SendIcon fontSize="large" />
                            </IconButton>
                        </Box>
                    </Grid>
                </Grid>
            </Box>
        )
    }
}

export default Chat