import React from "react"
import circleIcon from "../../icons/circle-16.png"

function Header(props)
{
    return (
        <h1 className="font-sans p-1">
            <img src={circleIcon} alt="online" className="inline-block object-top" />
            <div className="inline-block h-full">
                <span className="p-1 flex justify-center items-center">{props.onlineUsers} utenti online</span>
            </div>
        </h1>
    )
}

export default Header