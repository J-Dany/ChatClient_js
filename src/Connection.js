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
     * @returns Object
     */
    sendToFriend(friend, message, content = "PLAIN", language = null)
    {
        let dateTime = new Date()

        let mes = {
            Type: "FOR_PRIVATE",
            Content: content,
            Addresse: friend,
            Language: language,
            Message: message,
            HM: `${dateTime.getHours() < 10 ? "0" + dateTime.getHours() : dateTime.getHours()}:${dateTime.getMinutes() < 10 ? "0" + dateTime.getMinutes() : dateTime.getMinutes()}`,
            Data: `${dateTime.getFullYear()}-${dateTime.getMonth() < 10 ? "0" + (dateTime.getMonth() + 1) : dateTime.getMonth() + 1}-${dateTime.getDay() < 10 ? "0" + dateTime.getDate() : dateTime.getDate()} ${dateTime.getHours() < 10 ? "0" + dateTime.getHours() : dateTime.getHours()}:${dateTime.getMinutes() < 10 ? "0" + dateTime.getMinutes() : dateTime.getMinutes()}:${dateTime.getSeconds() < 10 ? "0" + dateTime.getSeconds() : dateTime.getSeconds()}`
        }

        this.socket.send(JSON.stringify(mes))

        return {
            Content: content,
            Language: language,
            Message: message,
            Data: `${dateTime.getHours() < 10 ? "0" + dateTime.getHours() : dateTime.getHours()}:${dateTime.getMinutes() < 10 ? "0" + dateTime.getMinutes() : dateTime.getMinutes()}`
        }
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
     * Sets the callback for the event "onerror"
     * 
     * @param {(message:MessageEvent)} callback
     */
    setOnErrorCallback(callback)
    {
        this.socket.onerror = callback
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
                    Username: username,
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