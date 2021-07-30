import React, { useContext } from "react"
import { Typography, Grid, Paper, Box, IconButton, SvgIcon, makeStyles } from "@material-ui/core"
import { ThemeContext } from "../../ThemeContext"
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
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
import ThatModal from "./ThatModal"
import InfoIcon from '@material-ui/icons/Info'

function Message(props)
{
    const context = useContext(ThemeContext)

    const useStyles = makeStyles({
        root: {
            '&:hover': {
                backgroundColor: "transparent"
            }
        }
    })

    const classes = useStyles()

    let [showInfo, setShowInfo] = React.useState(false)

    const handleClick = () => {
        setShowInfo(!showInfo)
    }

    //////////////////////////////////////////////
    // List of plugins for markdown:
    // https://github.com/remarkjs/remark/blob/HEAD/doc/plugins.md#list-of-plugins
    //////////////////////////////////////////////

    return (
    <>
        {showInfo
        ? <ThatModal postAction={handleClick}>
            <Typography variant="body1"><strong>Data</strong>: {props.data}</Typography>
            <Typography variant="body1"><strong>Content type</strong>: {props.content}</Typography>

            {props.content === "CODE"
            ? <Typography variant="body1"><strong>Language</strong>: {props.language}</Typography>
            : null}
        </ThatModal>
        : null}
        <Paper elevation={3} className="p-2 mb-2" style={{maxWidth: '64%', minWidth: '8%', backgroundColor: context.palette.color, color: context.palette.textColor}}>
            <div 
                style={
                    {
                        overflow: "hidden", 
                        wordWrap: "break-word",
                        marginBottom: props.content === "PLAIN" ? "-8px" : null
                    }
                } 
                className="w-100"
            >
                {
                    props.content === "PLAIN"
                        ? <ReactMarkdown skipHtml={true} remarkPlugins={[gfm, strip]}>
                            {props.message}
                        </ReactMarkdown>
                        :
                        <>
                            {
                                localStorage.getItem("supportedLanguages").includes(props.language)
                                ? <Box display="flex" flexDirection="row-reverse" className="mb-1">
                                    <IconButton style={{color: "#8bc34a"}}>
                                        <SvgIcon component={PlayArrowIcon} fontSize="small" />
                                    </IconButton>
                                </Box>
                                : null
                            }
                            <ReactAce theme="dracula" fontSize={14} mode={props.language} readOnly={true} value={props.message} />
                        </>
                }
            </div>
            <Grid container>
                <Grid item xs={6}>
                    <IconButton classes={classes} edge="start" disableRipple={true} style={{color: "white", height: "14px"}} onClick={handleClick}>
                        <SvgIcon component={InfoIcon} fontSize="inherit" style={{fontSize: "14px"}}/>
                    </IconButton>
                </Grid>
                <Grid item xs={6}>
                    <Box display="flex" flexDirection="row-reverse" alignItems="center" className="h-100">
                        <Typography variant="caption">{props.HM}</Typography>
                    </Box>
                </Grid>
            </Grid>
        </Paper>
    </>)
}

export default Message