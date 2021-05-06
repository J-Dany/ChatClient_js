import React from "react"
import settingsIcon from "../../icons/settings.png"
import Modal from "./Modal"

function Header(props)
{
    return (
        <div className="font-sans grid grid-cols-2">
            <div className="flex items-center">
                <div className="inline-block mr-2">
                    <div className="online-cirle object-center"></div>
                </div>
                <div className="inline-block">
                    <p>{props.onlineUsers} utenti online</p>
                </div>
            </div>
            <div className="flex justify-end">
                <button type="button">
                    <img src={settingsIcon} width="32" height="32" alt="settings" />
                </button>
            </div>
        </div>
    )
}

export default Header