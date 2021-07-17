import React from "react"
import ThatModal from "./ThatModal"
import AceEditor from "react-ace"
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
import "ace-builds/src-noconflict/mode-assembly_x86"
import "ace-builds/src-noconflict/theme-github"
import "ace-builds/src-noconflict/theme-monokai"
import "ace-builds/src-noconflict/theme-terminal"
import "ace-builds/src-noconflict/theme-nord_dark"
import "ace-builds/src-noconflict/theme-dracula"
import "ace-builds/src-noconflict/theme-ambiance"
import "ace-builds/src-noconflict/theme-tomorrow_night_blue"
import "ace-builds/src-noconflict/theme-iplastic"
import "ace-builds/src-min-noconflict/ext-language_tools"
import "ace-builds/src-noconflict/snippets/python"
import "ace-builds/src-noconflict/snippets/java"
import "ace-builds/src-noconflict/snippets/c_cpp"
import "ace-builds/src-noconflict/snippets/sql"
import "ace-builds/src-noconflict/snippets/golang"
import "ace-builds/src-noconflict/snippets/php"
import "ace-builds/src-noconflict/snippets/sh"
import "ace-builds/src-noconflict/snippets/css"
import "ace-builds/src-noconflict/snippets/javascript"
import { Grid, TextField, Box, IconButton, ThemeProvider, MenuItem, createMuiTheme } from "@material-ui/core"
import { lightBlue } from "@material-ui/core/colors"
import SendIcon from '@material-ui/icons/Send'

function ModalCode(props)
{
    const darkTheme = createMuiTheme({
        palette: {
            type: "dark",
            primary: lightBlue
        }
    })

    let codeEditorRef = React.createRef()

    let themes = [
        {
            name: "Dracula",
            tag: "dracula"
        },
        {
            name: "GitHub",
            tag: "github"
        },
        {
            name: "iplastic",
            tag: "iplastic"
        },
        {
            name: "nord dark",
            tag: "nord_dark"
        },
        {
            name: "Terminal",
            tag: "terminal"
        },
        {
            name: "Monokai",
            tag: "monokai"
        },
        {
            name: "Ambiance",
            tag: "ambiance"
        },
        {
            name: "Tomorrow Night Blue",
            tag: "tomorrow_night_blue"
        }
    ]

    let languages = [
        {
            name: "Asm x86",
            tag: "assembly_x86"
        },
        {
            name: "C++",
            tag: "c_cpp"
        },
        {
            name: "C#",
            tag: "csharp"
        },
        {
            name: "CSS",
            tag: "css"
        },
        {
            name: "Python",
            tag: "python"
        },
        {
            name: "PHP",
            tag: "php"
        },
        {
            name: "JavaScript",
            tag: "javascript"
        },
        {
            name: "Java",
            tag: "java"
        },
        {
            name: "SQL",
            tag: "sql"
        },
        {
            name: "Go",
            tag: "golang"
        }
    ]

    const [language, setLanguage] = React.useState(languages[1].tag)
    const [theme, setTheme] = React.useState(themes[0].tag)

    const changeLanguage = event => {
        setLanguage(event.target.value)
    }

    const changeTheme = event => {
        setTheme(event.target.value)
    }

    const sendMessage = () => {
        props.sendMessage(codeEditorRef.current.editor.getValue(), "CODE", language)
    }

    return (
        <ThatModal activate>
            <Grid container className="mb-2 w-100">
                <Grid item xs={3}>
                    <ThemeProvider theme={darkTheme}>
                        <TextField
                            select
                            fullWidth
                            label="Language"
                            value={language}
                            onChange={changeLanguage}
                        >
                            {languages.map(option => (
                                <MenuItem key={option.name} value={option.tag}>
                                    {option.name}
                                </MenuItem>
                            ))}
                        </TextField>
                    </ThemeProvider>
                </Grid>
                <Grid item xs={2}></Grid>
                <Grid item xs={3}>
                    <ThemeProvider theme={darkTheme}>
                        <TextField
                            select
                            fullWidth
                            label="Theme"
                            value={theme}
                            onChange={changeTheme}
                        >
                            {themes.map(option => (
                                <MenuItem key={option.name} value={option.tag}>
                                    {option.name}
                                </MenuItem>
                            ))}
                        </TextField>
                    </ThemeProvider>
                </Grid>
                <Grid item xs={1}></Grid>
                <Grid item xs={3}>
                    <Box display="flex" className="w-100" alignItems="center" justifyContent="flex-end">
                        <IconButton className="w-75" edge="end" style={{color: "white"}} onClick={() => sendMessage()}>
                            <SendIcon />
                        </IconButton>
                    </Box>
                </Grid>
            </Grid>
            <AceEditor
                ref={codeEditorRef}
                mode={language}
                theme={theme}
                fontSize={14}
                name="UNIQUE_ID_OF_DIV"
                enableBasicAutocompletion={true}
                enableLiveAutocompletion={true}
                enableSnippets={true}
            />
        </ThatModal>
    )
}

export default ModalCode