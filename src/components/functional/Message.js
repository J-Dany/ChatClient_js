import { Typography } from "@material-ui/core"
import React from "react"

function Message(props)
{
    return (<div className="shadow rounded w-25 mb-1">
        <div className="p-1">
            <Typography variant="body1">{props.message}</Typography>
        </div>
        <div className="p-1">
            <Typography variant="caption">{props.data}</Typography>
        </div>
    </div>)
}

export default Message