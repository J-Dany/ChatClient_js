import React from "react"
import Header from "./components/functional/Header"
import Body from "./components/Body"

class App extends React.Component
{
  constructor(props)
  {
    super(props)
    this.state = {
      onlineUsers: 0
    }
  }

  render()
  {
    return (
      <div>
        <Header onlineUsers={this.state.onlineUsers} />
        <hr className="m-1" />
        <Body />
      </div>
    )
  }
}

export default App;