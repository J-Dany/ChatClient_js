import React from "react"
import Header from "./components/functional/Header"
import Body from "./components/Body"
import LoginForm from "./components/LoginForm"
import { ThemeContext, primary, secondary } from "./ThemeContext"

class App extends React.Component
{
  constructor(props)
  {
    super(props)

    this.state = {
      serverIp: null
    }
  }

  render()
  {
    if (this.state.serverIp === null)
    {
      return (
        <>
          <ThemeContext.Provider value={{
            palette: primary
          }}>
            <LoginForm />
          </ThemeContext.Provider>
        </>
      )
    }
    return (
      <>
        <ThemeContext.Provider>
          <Header />
          <Body />
        </ThemeContext.Provider>
      </>
    )
  }
}

export default App;