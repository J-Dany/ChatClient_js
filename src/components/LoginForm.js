import React from "react"
import { TextField, Box, Container, Button, ThemeProvider, createMuiTheme, FormControlLabel, FormGroup } from "@material-ui/core"
import { lightBlue } from "@material-ui/core/colors"
import { ThemeContext } from "../ThemeContext"
import Checkbox from '@material-ui/core/Checkbox'
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
        this.state = { }
    }

    handleSubmit(event)
    {
        event.preventDefault()

        const ip = document.getElementById("ip").value
        const saveIp = document.getElementById("saveIp").checked

        if (!validatIp(ip))
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
            if (saveIp)
            {
                localStorage.setItem("serverIp", ip)
            }

            this.props.setServerIp(ip)
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
        
        return (
            <Box style={{height: "100%", backgroundColor: this.context.palette.dark}}>
                <Container maxWidth="sm" style={{height: "100%"}}>
                    <Box display="flex" justifyContent="center" alignItems="center" style={{height: "100%", width: "100%"}}>
                        <form onSubmit={event => this.handleSubmit(event)} autoComplete="off" style={{width: "100%"}}>
                            <FormGroup row={true}>
                                <InfoButton />
                            </FormGroup>
                            <ThemeProvider theme={darkTheme}>
                                <TextField {...this.state.ipField} label="Server IP" id="ip" required autoFocus fullWidth />
                                <FormControlLabel
                                    control={<Checkbox name="checkedA" id="saveIp" />}
                                    label="Salva questo indirizzo"
                                    className="white-text mt-1 mb-1"
                                />
                                <Button color="primary" variant="contained" fullWidth className="mt-2" type="submit">Join</Button>
                            </ThemeProvider>
                        </form>
                    </Box>
                </Container>
            </Box>
        )
    }
}

export default LoginForm