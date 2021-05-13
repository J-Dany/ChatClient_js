import { w3cwebsocket as WebSocket } from "websocket"

class Connection
{
    /**
     * Default constructor
     * @param {WebSocket} socket 
     */
    constructor (socket)
    {
        this.socket = socket
    }

    /**
     * Send a login message
     * 
     * @param {string} username 
     * @param {string} password
     */
    loginMessage(username, password)
    {
        this.socket.send(
            JSON.stringify(
                {
                    Type: "FOR_LOGIN",
                    Sender: username,
                    Password: password
                }
            )
        )
    }
}

export default Connection