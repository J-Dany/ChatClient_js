import React, { useContext } from "react"
import { Typography, Paper, Box } from "@material-ui/core"
import { ThemeContext } from "../../ThemeContext"
import ReactMarkdown from 'react-markdown'

function Message(props)
{
    const context = useContext(ThemeContext)

    return (<Paper elevation={3} className="p-2 mb-2" style={{maxWidth: '64%', minWidth: '8%', backgroundColor: context.palette.light, color: context.palette.textColor}}>
        <div style={{overflow: "hidden", wordWrap: "break-word"}} className="w-100">
            <ReactMarkdown>
                {props.message}
            </ReactMarkdown>
        </div>
        <Box display="flex" flexDirection="row-reverse">
            <Typography variant="caption">{props.data}</Typography>
        </Box>
    </Paper>)
}

export default Message