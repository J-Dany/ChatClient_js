import React from "react"
import { TextField, Box, Container, Button, ThemeProvider, createMuiTheme, FormControlLabel, Checkbox, Typography } from "@material-ui/core"
import { lightBlue } from "@material-ui/core/colors"
import { ThemeContext } from "../ThemeContext"
import InfoButton from "./functional/InfoButton"

function validatIp(ipaddress) 
{  
    if (/^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(ipaddress)) 
    {
        return true
    }

    return false
}

class LoginForm extends React.Component
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

        if (ip.value !== "localhost" && !validatIp(ip.value))
        {
            this.setState({
                ipField: {
                    error: true,
                    helperText: "IP non valido"
                }
            })
        }
        else
        {
            this.props.connect(ip.value, port.value)
                .then(value => {
                    if (value)
                    {
                        if (saveIp)
                        {
                            localStorage.setItem("serverIp", ip.value + ":" + port.value)
                        }

                        this.props.setServerIp(ip.value + ":" + port.value)
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
                    <Typography variant="body1">Loading...</Typography>
                </ThemeProvider>
            </Box>
        }
        else
        {
            body =  <Box display="flex" justifyContent="center" alignItems="center" style={{height: "100%", width: "100%"}}>
                        <form onSubmit={event => this.handleSubmit(event)} autoComplete="off" style={{width: "100%"}}>
                            <div>
                                <InfoButton />
                            </div>
                            <ThemeProvider theme={darkTheme}>
                                <Box display="flex">
                                    <TextField {...this.state.ipField} label="Server IP" id="ip" required autoFocus />
                                    <div style={{flexGrow: "1"}}></div>
                                    <TextField {...this.state.ipField} label="Server port" type="number" id="port" required />
                                </Box>
                                <FormControlLabel
                                    control={<Checkbox id="saveIp" />}
                                    label="Save this address"
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

export default LoginForm