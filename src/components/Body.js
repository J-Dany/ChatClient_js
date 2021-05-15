import React from "react"
import { Grid, Paper, Box } from "@material-ui/core"
import { ThemeContext } from "../ThemeContext"
import PhoneEnabledIcon from '@material-ui/icons/PhoneEnabled';

class Body extends React.Component
{
    static contextType = ThemeContext

    constructor(props)
    {
        super(props)
        this.state = { }
        this.connection = props.connection

        this.connection.setOnMessageCallback(message => {
            let json = JSON.parse(message.data)

            switch (json.Type)
            {
                case "FOR_PRIVATE":

                break
                case "FOR_NEW_CONNECTION":
                    
                break
            }
        })
    }

    render()
    {
        return (
            <div style={{backgroundColor: this.context.palette.color, color: this.context.palette.textColor, height: "100%"}}>
                <Grid container style={{height: "93%"}}>
                    <Grid item xs={4} md={3} lg={2} style={{height: "100%"}} className="p-3">
                        <Paper elevation={3} style={{backgroundColor: this.context.palette.color, color: this.context.palette.textColor, height: "100%", overflowY: "scroll"}}>
                            <Paper elevation={1} style={{backgroundColor: this.context.palette.color, color: this.context.palette.textColor}}>
                                <Grid container className="p-2">
                                    <Grid item xs={1} md={2}>
                                        <Box display="flex" alignItems="center" justifyContent="flex-start" style={{height: "100%"}}>
                                            <PhoneEnabledIcon />
                                        </Box>
                                    </Grid>
                                    <Grid item xs={10} md={9}>
                                        <Box display="flex" flexDirection="column" justifyContent="flex-end" style={{height: "100%"}}>
                                            <h6><b>Caccarello</b></h6>
                                            <small>salve</small>
                                        </Box>
                                    </Grid>
                                    <Grid item xs={1} md={1}>
                                        <Box display="flex" alignItems="center" style={{height: "100%"}}>
                                            <div style={{backgroundColor: "green", width: "16px", height: "16px", borderRadius: "50%"}}></div>
                                        </Box>
                                    </Grid>
                                </Grid>                                
                            </Paper>
                        </Paper>
                    </Grid>
                    <Grid item xs={8} md={9} lg={10} style={{height: "100%"}} className="p-3">
                        <Paper elevation={3} style={{backgroundColor: this.context.palette.color, color: this.context.palette.textColor, height: "100%"}} className="p-2">

                        </Paper>
                    </Grid>
                </Grid>
            </div>
        )
    }
}

export default Body