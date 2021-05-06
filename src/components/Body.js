import React from "react"
import { Grid, Typography } from "@material-ui/core"

class Body extends React.Component
{
    constructor(props)
    {
        super(props)
    }

    render()
    {
        return (
            <div style={{backgroundColor: this.props.palette.color, color: this.props.palette.textColor, height: "100%"}}>
                <Grid container style={{height: "100%"}}>
                    <Grid item sm={2} style={{height: "100%"}}>
                        
                    </Grid>
                    <Grid item sm={10} style={{borderLeft: "solid 0.5px grey", height: "100%"}}>
                        
                    </Grid>
                </Grid>
            </div>
        )
    }
}

export default Body