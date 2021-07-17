import React, { useContext } from "react"
import { Typography, Paper, Box } from "@material-ui/core"
import { ThemeContext } from "../../ThemeContext"
import ReactMarkdown from 'react-markdown'
import gfm from 'remark-gfm'
import strip from 'remark-strip-html'
import ReactAce from "react-ace/lib/ace"
import "ace-builds/src-noconflict/mode-java"
import "ace-builds/src-noconflict/mode-c_cpp"
import "ace-builds/src-noconflict/mode-css"
import "ace-builds/src-noconflict/mode-csharp"
import "ace-builds/src-noconflict/mode-python"
import "ace-builds/src-noconflict/mode-php"
import "ace-builds/src-noconflict/mode-sh"
import "ace-builds/src-noconflict/mode-javascript"
import "ace-builds/src-noconflict/mode-mysql"
import "ace-builds/src-noconflict/mode-pgsql"
import "ace-builds/src-noconflict/mode-sql"
import "ace-builds/src-noconflict/mode-golang"
import "ace-builds/src-noconflict/mode-c9search"
import "ace-builds/src-noconflict/theme-dracula"

function Message(props)
{
    const context = useContext(ThemeContext)

    //////////////////////////////////////////////
    // List of plugins for markdown:
    // https://github.com/remarkjs/remark/blob/HEAD/doc/plugins.md#list-of-plugins
    //////////////////////////////////////////////

    return (<Paper elevation={3} className="p-2 mb-2" style={{maxWidth: '64%', minWidth: '8%', backgroundColor: context.palette.color, color: context.palette.textColor}}>
        <div style={{overflow: "hidden", wordWrap: "break-word"}} className="w-100">
            {
                props.content === "PLAIN"
                    ? <ReactMarkdown skipHtml={true} remarkPlugins={[gfm, strip]}>
                        {props.message}
                    </ReactMarkdown>
                    : <ReactAce theme="dracula" fontSize={14} mode={props.language} readOnly={true} value={props.message} />
            }
            
        </div>
        <Box display="flex" flexDirection="row-reverse">
            <Typography variant="caption">{props.data}</Typography>
        </Box>
    </Paper>)
}

export default Message