import { TextField, Box, IconButton, Grid } from "@material-ui/core"
import React from "react"
import { ThemeContext } from "../ThemeContext"
import SendIcon from '@material-ui/icons/Send';

class Chat extends React.Component
{
    static contextType = ThemeContext

    constructor(props)
    {
        super(props)
    }

    render()
    {
        return (
            <Box display="flex" className="h-100">
                <Grid container className="mt-auto w-100" >
                    <Grid item md={11}>
                        <TextField fullWidth variant="outlined" id="textMessage" style={{color: this.context.palette.textColor}} />
                    </Grid>
                    <Grid item md={1}>
                        <IconButton className="w-100" edge="end">
                            <SendIcon style={{fontSize: "larger"}}/>
                        </IconButton>
                    </Grid>
                </Grid>
            </Box>
        )
    }
}

export default Chat