import React, { useContext } from "react"
import { Typography, Paper, Box } from "@material-ui/core"
import { ThemeContext } from "../../ThemeContext"
import ReactMarkdown from 'react-markdown'
import gfm from 'remark-gfm'
import strip from 'remark-strip-html'

function Message(props)
{
    const context = useContext(ThemeContext)

    //////////////////////////////////////////////
    // List of plugins for markdown:
    // https://github.com/remarkjs/remark/blob/HEAD/doc/plugins.md#list-of-plugins
    //////////////////////////////////////////////

    return (<Paper elevation={3} className="p-2 mb-2" style={{maxWidth: '64%', minWidth: '8%', backgroundColor: context.palette.color, color: context.palette.textColor}}>
        <div style={{overflow: "hidden", wordWrap: "break-word"}} className="w-100">
            <ReactMarkdown skipHtml={true} remarkPlugins={[gfm, strip]}>
                {props.message}
            </ReactMarkdown>
        </div>
        <Box display="flex" flexDirection="row-reverse">
            <Typography variant="caption">{props.data}</Typography>
        </Box>
    </Paper>)
}

export default Message