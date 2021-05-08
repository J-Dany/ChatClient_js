import React from "react"
import { TextField, Box, Container, Button } from "@material-ui/core"

class LoginForm extends React.Component
{
    constructor(props)
    {
        super(props)
        this.state = { }
    }

    handleSubmit(event)
    {
        event.preventDefault()
    }

    render()
    {
        return (
            <Box style={{height: "100%", backgroundColor: this.props.palette.light}}>
                <Container maxWidth="sm" style={{height: "100%"}}>
                    <Box display="flex" justifyContent="center" alignItems="center" style={{height: "100%", width: "100%"}}>
                        <form onSubmit={event => this.handleSubmit(event)} autoComplete="off" style={{width: "100%"}}>
                            <TextField id="outlined-basic" label="Server IP" variant="outlined" fullWidth inputProps={{className: {input: {color: "white"}}}} />
                            <Button color="primary" variant="contained" fullWidth>Join</Button>
                        </form>
                    </Box>
                </Container>
            </Box>
        )
    }
}

export default LoginForm