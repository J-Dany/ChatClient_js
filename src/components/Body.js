import React from "react"
import { Grid, Paper, Typography } from "@material-ui/core"
import { ThemeContext } from "../ThemeContext"
import ChatElement from "./functional/ChatElement"
import Chat from "./Chat"
import ThatModal from "./functional/ThatModal"
import { v1 as uuidv1 } from 'uuid'

class Body extends React.Component
{
    static contextType = ThemeContext

    constructor(props)
    {
        super(props)
        this.state = {
            loadChat: false,
            chat: null
        }

        this.props.connection.setOnMessageCallback(message => {
            let json = JSON.parse(message.data)

            switch (json.Type)
            {
                case "FOR_PRIVATE":
                    let lastMessageRef = this.state.refs[json.Sender].lastMessage.current

                    Notification.requestPermission()
                        .then(value => {
                            let n = new Notification(json.Sender, {
                                body: json.Message
                            })

                            n.close()
                        })

                    if (this.state.refs[json.Sender].chatRef.current)
                    {
                        this.state.refs[json.Sender].chatRef.current.updateMessages({
                            message: json.Message,
                            content: json.Content,
                            language: json.Language,
                            data: json.Data,
                            isFriendSender: true
                        })
                    }

                    console.log(json.Content === "CODE")

                    if (json.Content === "PLAIN")
                    {
                        lastMessageRef.innerText = json.Message
                    }
                    else
                    {
                        lastMessageRef.innerText = "...code..."
                    }
                break
                case "FOR_DISCONNECTION":
                    let onlineRef = this.state.refs[json.Username].onlineCircle.current

                    onlineRef.style.backgroundColor = ""
                break
                case "FOR_NEW_CONNECTION":
                    let oR = this.state.refs[json.Username].onlineCircle.current

                    oR.style.backgroundColor = "green"
                break
                case "FOR_SERVER_CLOSING":
                    this.setState({
                        isServerClosing: true
                    })
                break
                case "FOR_FRIEND_LIST":
                    let listFriend = [ ]
                    let refs = { }

                    for (let friend of json.Friends)
                    {
                        let lastMessage = React.createRef()
                        let onlineCircle = React.createRef()
                        let chatRef = React.createRef()

                        refs[friend.Name] = {
                            lastMessage: lastMessage,
                            onlineCircle: onlineCircle,
                            idFriend: parseInt(friend.IdFriend),
                            friendName: friend.Name,
                            chatRef: chatRef
                        }

                        listFriend.push(<ChatElement
                            key={uuidv1()}
                            friend={friend.Name}
                            online={friend.Online}
                            lastMessage={friend.LastMessage}
                            photo={`http://${this.props.connection.getWebServerIp()}/user-images/${friend.Photo}`}
                            loadChat={this.loadChat.bind(this)}
                            lastMessageRef={lastMessage}
                            onlineCircleRef={onlineCircle}
                            idFriend={parseInt(friend.IdFriend)}
                            chat={<Chat
                                key={parseInt(friend.IdFriend)}
                                palette={this.context.palette}
                                connection={this.props.connection}
                                idFriend={parseInt(friend.IdFriend)}
                                idGroup={undefined}
                                isGroup={false}
                                isFriend={true}
                                friendName={friend.Name}
                                groupName={undefined}
                                ref={chatRef}
                                lastMessageRef={lastMessage}
                            />}
                        />)
                    }

                    this.setState({
                        friends: listFriend,
                        refs: refs
                    })
                break
                default:
                    console.error(`Can't handle ${json.Type} request`)
                    console.info(json)
            }
        })
    }

    loadChat(chat)
    {
        this.setState({
            loadChat: true,
            chat: chat
        })
    }

    render()
    {
        return (
            <div style={{backgroundColor: this.context.palette.dark, color: this.context.palette.textColor, height: "100%"}}>
                {this.state.isServerClosing
                ? <ThatModal activate onClose={() => window.location.reload()}>
                    <Typography variant="h5">The server is closed!</Typography>
                </ThatModal>
                : null}
                <Grid container style={{height: "100%"}}>
                    <Grid item xs={4} md={3} xl={2} style={{height: "100%"}} className="p-3">
                        <Paper elevation={24} style={{backgroundColor: this.context.palette.dark, color: this.context.palette.textColor, height: "100%", borderRadius: "2px", overflowY: "auto"}}>
                            {
                                this.state.friends
                                ? this.state.friends.map(value => value)
                                : null
                            }
                        </Paper>
                    </Grid>
                    <Grid item xs={8} md={9} xl={10} style={{height: "100%"}} className="p-3">
                        <Paper elevation={24} style={{backgroundColor: this.context.palette.dark, color: this.context.palette.textColor, height: "100%", borderRadius: "2px"}}>
                            {
                                this.state.loadChat
                                ? this.state.chat
                                : null
                            }
                        </Paper>
                    </Grid>
                </Grid>
            </div>
        )
    }
}

export default Body