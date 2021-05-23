import { Box } from "@material-ui/core"
import React from "react"
import Message from "./Message"

function MessageList(props)
{
    return (
        <>
            {props.messages.map(value => <Box display="flex" className="w-100" justifyContent={value.isFriendSender ? 'flex-start' : 'flex-end'}>
                <Message message={value.message} data={value.data} />
            </Box>)}
        </>
    )
}

export default MessageList