import React from "react"
import Header from "./components/functional/Header"
import Body from "./components/Body"

class App extends React.Component
{
  constructor(props)
  {
    super(props)

    this.primary = {
      textColor: "#ffffff",
      color: "#37474f",
      light: "#62727b",
      dark: "#102027"
    }

    this.secondary = {
      textColor: "#ffffff",
      color: "#546e7a",
      light: "#819ca9",
      dark: "#29434e"
    }

    this.state = {
      palette: this.primary
    }
  }

  render()
  {
    return (
      <>
        <Header palette={this.state.palette} />
        <Body palette={this.state.palette} />
      </>
    )
  }
}

export default App;