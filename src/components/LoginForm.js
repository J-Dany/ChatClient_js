import React from "react"
import { TextField, Box, Container, Button, ThemeProvider, createMuiTheme } from "@material-ui/core"
import { lightBlue } from "@material-ui/core/colors"
import { ThemeContext } from "../ThemeContext"

function validatIp(ipaddress) {  
    if (/^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(ipaddress)) {  
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

        if (!validatIp(ip))
        {
            alert("Hai inserito un indirizzo ip non valido")
        }
        else
        {
            alert("Indirizzo ip valido")
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
                            <ThemeProvider theme={darkTheme}>
                                <TextField label="Server IP" id="ip" required autoFocus fullWidth />
                            </ThemeProvider>
                            <Button color="primary" variant="contained" fullWidth className="mt-2" type="submit">Join</Button>
                        </form>
                    </Box>
                </Container>
            </Box>
        )
    }
}

export default LoginForm