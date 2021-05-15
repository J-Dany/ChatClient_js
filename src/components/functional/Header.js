import React, { useContext } from "react"
import { AppBar, Toolbar, IconButton } from "@material-ui/core"
import MoreIcon from '@material-ui/icons/MoreVert'
import { ThemeContext } from "../../ThemeContext"
import PersonAddIcon from '@material-ui/icons/PersonAdd';

function Header(props)
{
    const context = useContext(ThemeContext)

    return (
        <AppBar position="static" style={{backgroundColor: context.palette.dark}}>
            <Toolbar>
                <IconButton edge="start" onClick={() => props.activeDarkMode()} style={{color: context.palette.textColor}}>
                    {context.darkMode.icon}
                </IconButton>
                <IconButton edge="end" style={{color: context.palette.textColor}}>
                    <PersonAddIcon />
                </IconButton>
                <div style={{flexGrow: "1"}}></div>
                <IconButton edge="start" aria-label="menu" style={{color: context.palette.textColor}}>
                    <MoreIcon />
                </IconButton>
            </Toolbar>
        </AppBar>
    )
}

export default Header