import { Box } from "@material-ui/core"
import React from "react"
import Message from "./Message"
import { v1 as uuidv1 } from 'uuid'

function MessageList(props)
{
    return (
        <>
            {props.messages.map(value => <Box key={uuidv1()} display="flex" className="w-100" justifyContent={value.isFriendSender ? 'flex-start' : 'flex-end'}>
                <Message key={uuidv1()} message={value.message} content={value.content} language={value.language} data={value.data} />
            </Box>)}
        </>
    )
}

export default MessageList