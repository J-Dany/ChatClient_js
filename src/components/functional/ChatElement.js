import { Avatar, Grid, Paper, Typography, Box } from "@material-ui/core"
import React, { useContext } from "react"
import { ThemeContext } from "../../ThemeContext"

function ChatElement(props)
{
    const context = useContext(ThemeContext)

    return (
        <Paper elevation={1} style={{backgroundColor: context.palette.color, color: context.palette.textColor, cursor: "pointer"}} className="p-4">
            <Grid container>
                <Grid item xs={2} md={2}>
                    <Box display="flex" alignItems="center" style={{height: "100%"}}>
                        <Avatar src="" />
                    </Box>
                </Grid>
                <Grid item xs={8} md={8}>
                    <Typography variant="h5">{props.friend}</Typography>
                    <small>Placeholder</small>
                </Grid>
                <Grid item xs={2} md={2}>

                </Grid>
            </Grid>
        </Paper>
    )
}

export default ChatElement