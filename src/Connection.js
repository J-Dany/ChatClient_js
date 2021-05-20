class Connection
{
    /**
     * Default constructor
     * @param {WebSocket} socket 
     */
    constructor(socket, webServerIp)
    {
        this.socket = socket
        this.webServerIp = webServerIp

        this.socket.onerror = event => {
            console.error(event)
        }
    }

    /**
     * Send a message to a friend
     * 
     * @param {string} friend
     * @param {string} message
     */
    sendToFriend(friend, message)
    {
        let dateTime = new Date()
        this.socket.send(JSON.stringify({
            Type: "FOR_PRIVATE",
            Addresse: friend,
            Message: message,
            Data: `${dateTime.getFullYear()}-${dateTime.getMonth() < 10 ? "0" + dateTime.getMonth() : dateTime.getMonth()}-${dateTime.getDay() < 10 ? "0" + dateTime.getDay() : dateTime.getDay()} ${dateTime.getHours() < 10 ? "0" + dateTime.getHours() : dateTime.getHours()}:${dateTime.getMinutes() < 10 ? "0" + dateTime.getMinutes() : dateTime.getMinutes()}:${dateTime.getSeconds() < 10 ? "0" + dateTime.getSeconds() : dateTime.getSeconds()}`
        }))
    }

    /**
     * Sets the callback for the event "onmessage"
     * 
     * @param {(message:MessageEvent)} callback
     */
    setOnMessageCallback(callback)
    {
        this.socket.onmessage = callback
    }

    /**
     * Returns the web server ip
     * 
     * @returns string
     */
    getWebServerIp()
    {
        return this.webServerIp
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

    closeConnection()
    {
        this.socket.send(JSON.stringify({
            Type: "FOR_CLOSE_CONNECTION"
        }))

        this.socket.close()
    }
}

export default Connection