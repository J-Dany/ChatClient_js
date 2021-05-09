import React from "react"
import { Grid } from "@material-ui/core"
import { ThemeContext } from "../ThemeContext"

class Body extends React.Component
{
    static contextType = ThemeContext

    constructor(props)
    {
        super(props)
        this.state = { }
    }

    render()
    {
        return (
            <div style={{backgroundColor: this.context.palette.color, color: this.context.palette.textColor, height: "100%"}}>
                <Grid container style={{height: "100%"}}>
                    <Grid item xs={4} md={3} lg={2} style={{height: "100%"}}>
                        
                    </Grid>
                    <Grid item xs={8} md={9} lg={10} style={{borderLeft: "solid 0.5px grey", height: "100%"}}>
                        
                    </Grid>
                </Grid>
            </div>
        )
    }
}

export default Body