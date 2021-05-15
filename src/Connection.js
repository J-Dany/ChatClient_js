class Connection
{
    /**
     * Default constructor
     * @param {WebSocket} socket 
     */
    constructor(socket)
    {
        this.socket = socket
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
     * Send a login message
     * 
     * @param {string} username 
     * @param {string} password
     */
    loginMessage(username, password)
    {
        let xml = new XMLHttpRequest()
        
        xml.onload = data => {
            if (xml.status === 200)
            {
                let json = JSON.parse(xml.responseText)

                this.socket.send(
                    JSON.stringify(
                        {
                            Type: "FOR_LOGIN",
                            Sender: username,
                            Password: json.Digest
                        }
                    )
                )
            }
        }

        xml.open("GET", `https://api.hashify.net/hash/sha256/base64?value=${password}`, false)
        xml.send()
    }
}

export default Connection