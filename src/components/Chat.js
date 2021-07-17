import { TextField, Box, IconButton, Grid, createMuiTheme, ThemeProvider } from "@material-ui/core"
import React from "react"
import { ThemeContext } from "../ThemeContext"
import SendIcon from '@material-ui/icons/Send'
import MessageList from "./functional/MessageList"
import loading from "../icons/loading.svg"
import axios from "axios"
import { lightBlue } from "@material-ui/core/colors"
import CodeIcon from '@material-ui/icons/Code'
import AttachFileIcon from '@material-ui/icons/AttachFile';
import ModalCode from "./functional/ModalCode"
import { v1 as uuidv1 } from 'uuid'

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

    sendMessage(message, content = "PLAIN", language = null)
    {
        if (message.length === 0)
        {
            return
        }

        if (content === "PLAIN")
        {
            this.props.lastMessageRef.current.innerText = message
        }
        else
        {
            this.props.lastMessageRef.current.innerText = "...code..."
        }        

        if (this.props.isFriend)
        {
            let mes = this.connection.sendToFriend(
                this.props.friendName,
                message,
                content,
                language
            )

            this.updateMessages({
                data: mes.Data,
                message: mes.Message,
                content: content,
                language: language,
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

                for (let j of json)
                {
                    let message = {
                        message: j.message,
                        content: j.contentType,
                        language: j.language,
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
        if (event.ctrlKey && event.keyCode === 13)
        {
            this.sendMessage(document.getElementById("textMessage").value)
        }
    }

    handleClickOnCodeButton()
    {
        this.codeRef = React.createRef()

        this.setState(
            {
                modalCode: <ModalCode key={uuidv1()} sendMessage={this.sendMessage.bind(this)} />
            }
        )
    }

    render()
    {
        const darkTheme = createMuiTheme({
            palette: {
                type: "dark",
                primary: lightBlue
            }
        });

        return (
            <Box display="flex" flexDirection="column" className="h-100 p-2">
                {
                this.state.modalCode
                    ? this.state.modalCode
                    : null
                }

                {
                this.state.isLoadingMessage
                    ?  <Box display="flex" flexDirection="column" className="mb-2 p-2 w-100 " style={{overflowY: 'auto'}}>
                            <MessageList messages={this.state.messages} />
                        </Box>
                    :   <Box display="flex" justifyContent="center" alignItems="center" className="h-100">
                            <img src={loading} alt="loading..." width="64" height="64" />
                        </Box>
                }

                <Grid container className="mt-auto w-100 align-items-center p-2">
                    <Grid item xs={1}>
                        <Grid container className="w-100 align-items-center p-2">
                            <Grid item xs={5}>
                                <IconButton className="w-100" edge="start" style={{color: this.context.palette.textColor}}>
                                    <AttachFileIcon fontSize="large" />
                                </IconButton>
                            </Grid>
                            <Grid item xs={1}></Grid>
                            <Grid item xs={5}>
                                <IconButton className="w-100" onClick={() => this.handleClickOnCodeButton()} style={{color: this.context.palette.textColor}}>
                                    <CodeIcon fontSize="large" />
                                </IconButton>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={10}>
                        <ThemeProvider theme={darkTheme}>
                            <TextField
                                multiline
                                fullWidth
                                autoFocus
                                autoComplete="off"
                                variant="outlined"
                                rowsMax={2}
                                id="textMessage"
                                inputProps={
                                    {
                                        style: {
                                            color: this.props.palette.textColor
                                        }
                                    }
                                }
                                onKeyDown={event => this.handleKeyDown(event)}
                            />
                        </ThemeProvider>
                    </Grid>
                    <Grid item xs={1}>
                        <Box display="flex" alignItems="center" justifyContent="center">
                            <IconButton className="w-75" edge="end" style={{color: this.context.palette.textColor}} onClick={() => this.sendMessage(document.getElementById("textMessage").value)}>
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