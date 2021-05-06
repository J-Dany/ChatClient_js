import React from "react"
import { AppBar, Toolbar, IconButton } from "@material-ui/core"
import MoreIcon from '@material-ui/icons/MoreVert'

function Header(props)
{
    return (
        <AppBar position="static" style={{backgroundColor: props.palette.dark}}>
            <Toolbar>
                <div style={{flexGrow: "1"}}></div>
                <IconButton edge="start" aria-label="menu" style={{color: props.palette.textColor}}>
                    <MoreIcon />
                </IconButton>
            </Toolbar>
        </AppBar>
    )
}

export default Header