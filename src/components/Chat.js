import { OutlinedInput, SvgIcon, Box, IconButton, createMuiTheme, ThemeProvider } from "@material-ui/core"
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

class Chat extends React.Component {
    static contextType = ThemeContext

    constructor(props) {
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
            messages: []
        }

        this.connection = props.connection
    }

    componentDidMount() {
        this.loadLastMessage()
    }

    updateMessages(message) {
        let messages = this.state.messages.slice()

        messages.push(message)

        this.setState(() => {
            return { 
                messages: messages
            }
        }, () => {
            document.getElementById("messageListBottom").focus()
        })
    }

    /**
     * 
     * @param {array} messages 
     */
    updateMessagesWithArray(messages)
    {
        this.setState(
            {
                messages: messages
            }
        )
    }

    sendMessage(message, content = "PLAIN", language = null) {
        if (message.length === 0) {
            return
        }

        document.getElementById("textMessage").value = ""

        if (content === "PLAIN") {
            this.props.lastMessageRef.current.innerText = message
        }
        else {
            this.props.lastMessageRef.current.innerText = "...code..."
        }

        if (this.props.isFriend) {
            this.updateMessages(
                this.connection.sendToFriend(
                    this.props.friendName,
                    message,
                    content,
                    language
                )
            )
        }
        else if (this.props.isGroup) {

        }
    }

    loadLastMessage() {
        this.setState({
            isLoadingMessage: true
        })

        axios.get(`http://${this.connection.getWebServerIp()}/get-last-messages/${localStorage.getItem('id')}/${this.props.idFriend}`)
            .then(value => {
                let json = value.data
                let arr = [ ]

                for (let j of json) {
                    let data = new Date(j.data)

                    let message = {
                        message: j.message,
                        content: j.contentType,
                        language: j.language,
                        data: j.data,
                        HM: `${data.getHours() < 10 ? "0" + data.getHours() : data.getHours()}:${data.getMinutes() < 10 ? "0" + data.getMinutes() : data.getMinutes()}`,
                        isFriendSender: j.sender.idUser === parseInt(this.props.idFriend)
                            ? true
                            : false
                    }

                    arr.push(message)
                }

                this.updateMessagesWithArray(arr)

                this.setState({
                    isLoadingMessage: false
                })

                document.getElementById("messageListBottom").focus()
            })
    }

    handleKeyDown(event) {
        if (event.ctrlKey && event.keyCode === 13) {
            this.sendMessage(document.getElementById("textMessage").value)
        }
    }

    handleClickOnCodeButton() {
        this.codeRef = React.createRef()

        this.setState(
            {
                modalCode: <ModalCode key={uuidv1()} sendMessage={this.sendMessage.bind(this)} />
            }
        )
    }

    render() {
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
                    !this.state.isLoadingMessage
                        ? <Box display="flex" flexDirection="column" className="mb-3 p-2 w-100 " style={{ overflowY: 'scroll' }}>
                            <MessageList messages={this.state.messages} />
                            <div tabIndex="0" id="messageListBottom"></div>
                        </Box>
                        : <Box display="flex" justifyContent="center" alignItems="center" className="h-100">
                            <img src={loading} alt="loading..." width="64" height="64" />
                        </Box>
                }

                <div className="mt-auto">
                    <ThemeProvider theme={darkTheme}>
                        <OutlinedInput
                            startAdornment={
                                <>
                                    <IconButton edge="start" style={{ color: this.context.palette.textColor }}>
                                        <SvgIcon component={AttachFileIcon} />
                                    </IconButton>
                                    <IconButton edge="start" onClick={() => this.handleClickOnCodeButton()} style={{ color: this.context.palette.textColor }}>
                                        <SvgIcon component={CodeIcon} />
                                    </IconButton>
                                </>
                            }
                            endAdornment={
                                <IconButton style={{ color: this.context.palette.textColor }} onClick={() => this.sendMessage(document.getElementById("textMessage").value)}>
                                    <SvgIcon component={SendIcon} />
                                </IconButton>
                            }
                            margin="dense"
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
                                        color: this.props.palette.textColor,
                                        fontSize: "large"
                                    }
                                }
                            }
                            onKeyDown={event => this.handleKeyDown(event)}
                        />
                    </ThemeProvider>
                </div>
            </Box>
        )
    }
}

export default Chat