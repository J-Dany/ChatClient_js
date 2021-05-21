import React from "react"
import { Grid, Paper } from "@material-ui/core"
import { ThemeContext } from "../ThemeContext"
import ChatElement from "./functional/ChatElement"

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
            console.log(json)

            switch (json.Type)
            {
                case "FOR_PRIVATE":
                    let lastMessageRef = this.state.refs[json.Sender].lastMessage.current

                    lastMessageRef.innerHTML = json.Message
                break
                case "FOR_NEW_CONNECTION":
                    let onlineRef = this.state.refs[json.Username].onlineCircle.current

                    onlineRef.style.backgroundColor = "green"
                break
                case "FOR_FRIEND_LIST":
                    let listFriend = [ ]
                    let refs = { }

                    for (let friend in json.Friends)
                    {
                        let lastMessage = React.createRef()
                        let onlineCircle = React.createRef()

                        refs[json.Friends[friend].Name] = {
                            lastMessage: lastMessage,
                            onlineCircle: onlineCircle
                        }

                        listFriend.push(<ChatElement
                            friend={json.Friends[friend].Name} 
                            online={json.Friends[friend].Online} 
                            lastMessage={json.Friends[friend].LastMessage}
                            photo={`http://${this.connection.getWebServerIp()}/user-images/${json.Friends[friend].Photo}`}
                            loadChat={this.loadChat.bind(this)}
                            connection={this.connection}
                            lastMessageRef={lastMessage}
                            onlineCircleRef={onlineCircle}
                            friendId={json.Friends[friend].IdFriend}
                            groupId={json.Friends[friend].IdGroup}
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

    loadChat(chatComponent)
    {
        this.setState({
            chat: chatComponent
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
                            {this.state.chat}
                        </Paper>
                    </Grid>
                </Grid>
            </div>
        )
    }
}

export default Body