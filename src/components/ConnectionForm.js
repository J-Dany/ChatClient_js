import React from "react"
import { TextField, Box, Container, Button, ThemeProvider, createMuiTheme, FormControlLabel, Checkbox, Typography } from "@material-ui/core"
import { lightBlue } from "@material-ui/core/colors"
import { ThemeContext } from "../ThemeContext"
import InfoButton from "./functional/InfoButton"

class ConnectionForm extends React.Component
{
    static contextType = ThemeContext
    
    constructor(props)
    {
        super(props)
        this.state = {
            server: {
                isConnecting: false
            }
        }
    }

    handleSubmit(event)
    {
        event.preventDefault()

        this.setState({
            server: {
                isConnecting: true
            }
        })

        const ip = document.getElementById("ip")
        const port = document.getElementById("port")
        const saveIp = document.getElementById("saveIp").checked
        const saveIpWebServer = document.getElementById("saveIpWs").checked
        const webServerIp = document.getElementById("ws_ip")

        this.props.connect(ip.value, port.value, webServerIp.value)
            .then(value => {
                if (value)
                {
                    if (saveIp)
                    {
                        localStorage.setItem("serverIp", ip.value + ":" + port.value)
                    }

                    if (saveIpWebServer)
                    {
                        localStorage.setItem("webServerIp", webServerIp.value)
                    }

                    this.props.setServerIp(ip.value + ":" + port.value, webServerIp.value)
                }
                else
                {
                    alert(`Unable to connect to ${ip.value}:${port.value}`)

                    this.setState({
                        server: {
                            isConnecting: false
                        }
                    })
                }
            })
    }

    render()
    {
        const darkTheme = createMuiTheme({
            palette: {
                type: "dark",
                primary: lightBlue
            }
        });

        let body = null

        if (this.state.server.isConnecting)
        {
            body = <Box display="flex" justifyContent="center" alignItems="center" style={{height: "100%"}}>
                <ThemeProvider theme={darkTheme}>
                    <Typography variant="body1" style={{color: this.context.palette.textColor}}>Loading...</Typography>
                </ThemeProvider>
            </Box>
        }
        else
        {
            body =  <Box display="flex" justifyContent="center" alignItems="center" style={{height: "100%", width: "100%"}}>
                        <form onSubmit={event => this.handleSubmit(event)} autoComplete="off" style={{width: "100%"}}>
                            <Box display="flex" justifyContent="flex-end">
                                <InfoButton />
                            </Box>
                            <ThemeProvider theme={darkTheme}>
                                <Box display="flex" className="mb-2">
                                    <TextField {...this.state.ipField} label="Server IP" id="ip" required autoFocus />
                                    <div style={{flexGrow: "1"}}></div>
                                    <TextField label="Server port" type="number" id="port" required />
                                </Box>
                                <Box>
                                    <TextField label="Web Server IP" id="ws_ip" required autoFocus fullWidth />
                                </Box>
                                <FormControlLabel
                                    control={<Checkbox id="saveIp" />}
                                    label="Save server address"
                                    className="white-text mt-1 mb-1"
                                />
                                <FormControlLabel
                                    control={<Checkbox id="saveIpWs" />}
                                    label="Save web server address"
                                    className="white-text mt-1 mb-1"
                                />
                                <Button color="primary" variant="contained" fullWidth className="mt-2" type="submit">Join</Button>
                            </ThemeProvider>
                        </form>
                    </Box>
        }
        
        return (
            <Box style={{height: "100%", backgroundColor: this.context.palette.dark}}>
                <Container maxWidth="sm" style={{height: "100%"}}>
                    {body}
                </Container>
            </Box>
        )
    }
}

export default ConnectionForm