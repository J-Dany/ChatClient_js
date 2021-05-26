import React from "react"
import { Grid, Paper } from "@material-ui/core"
import { ThemeContext } from "../ThemeContext"
import ChatElement from "./functional/ChatElement"
import Chat from "./Chat"

class Body extends React.Component
{
    static contextType = ThemeContext

    constructor(props)
    {
        super(props)
        this.state = { }
        this.connection = props.connection

        this.connection.setOnMessageCallback(message => {
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

                    this.updateMessages(json.Sender, null, {
                        message: json.Message,
                        data: json.Data,
                        isFriendSender: true
                    })

                    lastMessageRef.innerHTML = json.Message
                break
                case "FOR_DISCONNECTION":
                    let onlineRef = this.state.refs[json.Username].onlineCircle.current

                    onlineRef.style.backgroundColor = ""
                break
                case "FOR_NEW_CONNECTION":
                    let oR = this.state.refs[json.Username].onlineCircle.current

                    oR.style.backgroundColor = "green"
                break
                case "FOR_FRIEND_LIST":
                    let listFriend = [ ]
                    let refs = { }

                    for (let friend in json.Friends)
                    {
                        let lastMessage = React.createRef()
                        let onlineCircle = React.createRef()
                        let messages = [ ]

                        refs[json.Friends[friend].Name] = {
                            lastMessage: lastMessage,
                            onlineCircle: onlineCircle,
                            messages: messages,
                            idFriend: parseInt(json.Friends[friend].IdFriend),
                            friendName: json.Friends[friend].Name
                        }

                        listFriend.push(<ChatElement
                            friend={json.Friends[friend].Name}
                            online={json.Friends[friend].Online}
                            lastMessage={json.Friends[friend].LastMessage}
                            photo={`http://${this.connection.getWebServerIp()}/user-images/${json.Friends[friend].Photo}`}
                            loadChat={this.loadChat.bind(this)}
                            lastMessageRef={lastMessage}
                            onlineCircleRef={onlineCircle}
                            idFriend={parseInt(json.Friends[friend].IdFriend)}
                            idGroup={parseInt(json.Friends[friend].IdGroup)}
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

    /**
     * @param {string} friendName
     * @param {string} groupName
     * @param {Object} message
     */
    updateMessages(friendName, groupName, message)
    {
        this.state.refs[friendName].messages.push(message)

        this.setState(prevState => {
            return {
                refs: prevState.refs
            }
        })
    }

    loadChat(idFriend, idGroup, friendName, groupName)
    {
        this.setState(prevState => {
            return ({
                loadChat: true,
                chat: <Chat
                    palette={this.context.palette}
                    messages={prevState.refs[friendName || groupName].messages}
                    updateMessages={this.updateMessages.bind(this)}
                    connection={this.connection}
                    idFriend={idFriend}
                    idGroup={idGroup}
                    isGroup={idGroup ? true : false}
                    isFriend={idFriend ? true : false}
                    friendName={friendName}
                    groupName={groupName}
                />
            })
        })
    }

    render()
    {
        return (
            <div style={{backgroundColor: this.context.palette.color, color: this.context.palette.textColor, height: "100%"}}>
                <Grid container style={{height: "100%"}}>
                    <Grid item xs={4} md={3} xl={2} style={{height: "100%"}} className="p-3">
                        <Paper elevation={3} style={{backgroundColor: this.context.palette.color, color: this.context.palette.textColor, height: "100%", overflowY: "auto"}}>
                            {
                                this.state.friends
                                ? this.state.friends.map(value => value)
                                : null
                            }
                        </Paper>
                    </Grid>
                    <Grid item xs={8} md={9} xl={10} style={{height: "100%"}} className="p-3">
                        <Paper elevation={3} style={{backgroundColor: this.context.palette.color, color: this.context.palette.textColor, height: "100%"}} className="p-2">
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