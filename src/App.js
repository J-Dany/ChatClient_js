import React from "react"
import Header from "./components/functional/Header"
import BrightnessHighIcon from '@material-ui/icons/BrightnessHigh';
import Brightness4Icon from '@material-ui/icons/Brightness4';
import Body from "./components/Body"
import LoginForm from "./components/LoginForm"
import { ThemeContext, primary, secondary } from "./ThemeContext"
import { w3cwebsocket as WebSocket } from "websocket"

class App extends React.Component
{
  constructor(props)
  {
    super(props)

    this.state = {
      serverIp: localStorage.getItem("serverIp"),
      theme: primary,
      darkMode: {
        isDarkMode: true,
        icon: <BrightnessHighIcon />
      }
    }
  }

  setServerIp(ip)
  {
    this.setState(
      {
        serverIp: ip
      }
    )
  }

  async connectTo(ip, port)
  {
    return new Promise((resolve, reject) => {
      this.socket = new WebSocket(`ws://${ip}:${port}`)

      this.socket.onopen = () => {
        resolve(true)
      }

      this.socket.onmessage = message => {
        console.log("Message: " + message.data)
      }

      this.socket.onerror = () => {
        resolve(false)
      }
    })
  }

  activeDarkMode()
  {
    if (this.state.darkMode.isDarkMode)
    {
      this.setState(
        {
          theme: secondary,
          darkMode: {
            isDarkMode: false,
            icon: <Brightness4Icon />
          }
        }
      )
    }
    else
    {
      this.setState(
        {
          theme: primary,
          darkMode: {
            isDarkMode: true,
            icon: <BrightnessHighIcon />
          }
        }
      )
    }
  }

  render()
  {
    if (this.state.serverIp === null)
    {
      return (
        <>
          <ThemeContext.Provider value={{palette: this.state.theme}}>
            <LoginForm setServerIp={this.setServerIp.bind(this)} connect={this.connectTo.bind(this)} />
          </ThemeContext.Provider>
        </>
      )
    }
    return (
      <>
        <ThemeContext.Provider value={{palette: this.state.theme, darkMode: this.state.darkMode}}>
          <Header activeDarkMode={this.activeDarkMode.bind(this)} />
          <Body />
        </ThemeContext.Provider>
      </>
    )
  }
}

export default App;