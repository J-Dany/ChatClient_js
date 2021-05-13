import React from "react"
import { Box, Container, ThemeProvider, Typography, TextField, Button, createMuiTheme } from "@material-ui/core"
import { ThemeContext } from "../ThemeContext"
import { lightBlue } from "@material-ui/core/colors"

class LoginForm extends React.Component
{
    static contextType = ThemeContext

    constructor (props)
    {
        super(props)

        this.state = {
            requestLogin: {
                isLoading: false
            }
        }
    }

    handleSubmit (event)
    {
        event.preventDefault()

        let username = document.getElementById("username").value
        let password = document.getElementById("password").value

        this.props.connection.loginMessage(username, password)
    }

    render ()
    {
        const darkTheme = createMuiTheme({
            palette: {
                type: "dark",
                primary: lightBlue
            }
        });

        if (this.state.requestLogin.isLoading)
        {
            return (
                <Box style={{height: "100%", backgroundColor: this.context.palette.dark}}>
                    <Container maxWidth="sm" style={{height: "100%"}}>
                        <ThemeProvider theme={darkTheme}>
                            <Typography variant="body1" style={{color: this.context.palette.textColor}}>Sign In...</Typography>
                        </ThemeProvider>
                    </Container>
                </Box>
            )
        }

        return (
            <Box style={{height: "100%", backgroundColor: this.context.palette.dark}}>
                <Container maxWidth="sm" style={{height: "100%"}}>
                    <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" style={{height: "100%"}}>
                        <Typography variant="h4" style={{color: this.context.palette.textColor}}>Sign in</Typography>
                        <form method="POST" onSubmit={event => this.handleSubmit(event)}>
                            <ThemeProvider theme={darkTheme}>
                                <TextField type="text" id="username" label="Username" fullWidth />
                                <TextField type="password" id="password" label="Password" fullWidth className="mt-1" />
                                <Button variant="contained" type="submit" color="primary" fullWidth className="mt-3">Sign In</Button>
                            </ThemeProvider>
                        </form>
                    </Box>
                </Container>
            </Box>
        )
    }
}

export default LoginForm