import { Typography } from "@material-ui/core"
import React from "react"

function Message(props)
{
    return (<div className="shadow rounded p-1 w-50">
        <div className="p-1">
            <Typography variant="body1">{props.message}</Typography>
        </div>
        <div className="p-1">
            <Typography variant="body2">{props.data}</Typography>
        </div>
    </div>)
}

export default Message