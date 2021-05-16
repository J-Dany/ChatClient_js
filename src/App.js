import React from "react"
import Header from "./components/functional/Header"
import BrightnessHighIcon from '@material-ui/icons/BrightnessHigh';
import Brightness4Icon from '@material-ui/icons/Brightness4';
import Body from "./components/Body"
import ConnectionForm from "./components/ConnectionForm"
import { ThemeContext, primary, secondary } from "./ThemeContext"
import { w3cwebsocket as WebSocket } from "websocket"
import LoginForm from "./components/LoginForm"
import Connection from "./Connection"

class App extends React.Component
{
  constructor(props)
  {
    super(props)

    this.state = {
      serverIp: localStorage.getItem("serverIp"),
      isLogged: false,
      theme: primary,
      darkMode: {
        isDarkMode: true,
        icon: <BrightnessHighIcon />
      }
    }
  }

  componentDidMount()
  {
    if (this.state.serverIp !== null)
    {
      let [ip, port] = this.state.serverIp.split(":")
      this.connectTo(ip, port)
        .then(value => {
          if (value)
          {
            this.setServerIp(`${ip}:${port}`)
          }
          else
          {
            this.setState(
              {
                serverIp: null
              }
            )
          }
        })
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

  setIsLogged(value)
  {
    localStorage.removeItem("serverIP")
    this.setState(
      {
        isLogged: value,
        serverIp: localStorage.getItem("serverIp")
      }
    )

    if (localStorage.getItem("serverIp"))
    {
      const [ip, port] = localStorage.getItem("serverIp").split(":")

      this.connectTo(ip, port)
    }
  }

  closeConnection()
  {
    this.connection.closeConnection()
    this.setState({
      isLogged: false
    })
  }

  async connectTo(ip, port)
  {
    return new Promise((resolve, reject) => {
      this.socket = new WebSocket(`ws://${ip}:${port}`)

      this.connection = new Connection(this.socket)

      window.onclose = () => {
        this.closeConnection()
      }

      this.connection.setOnMessageCallback(message => {
        let json = JSON.parse(message.data)

        if (json.Type === "FOR_LOGIN")
        {
          if (json.Status)
          {
            this.setIsLogged(true)
          }
          else
          {
            alert("Login failed")
          }
        }
      })

      this.socket.onopen = () => {
        resolve(true)
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

  deleteServerAddress()
  {
    localStorage.removeItem("serverIp")

    this.setState({
      serverIp: localStorage.getItem("serverIp")
    })
  }

  render()
  {
    if (this.state.serverIp === null)
    {
      return (
        <>
          <ThemeContext.Provider value={{palette: this.state.theme}}>
            <ConnectionForm setServerIp={this.setServerIp.bind(this)} connect={this.connectTo.bind(this)} />
          </ThemeContext.Provider>
        </>
      )
    }
    
    if (!this.state.isLogged)
    {
      return (
        <>
          <ThemeContext.Provider value={{palette: this.state.theme}}>
            <LoginForm connection={this.connection} removeServerIp={this.deleteServerAddress.bind(this)} setLogged={this.setIsLogged.bind(this)} />
          </ThemeContext.Provider>
        </>
      )
    }

    return (
      <>
        <ThemeContext.Provider value={{palette: this.state.theme, darkMode: this.state.darkMode}}>
          <Header activeDarkMode={this.activeDarkMode.bind(this)} closeConnection={this.closeConnection.bind(this)} />
          <Body connection={this.connection} />
        </ThemeContext.Provider>
      </>
    )
  }
}

export default App;