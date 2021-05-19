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