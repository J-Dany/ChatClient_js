import React from "react"
import Header from "./components/functional/Header"
import Body from "./components/Body"
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import LoginForm from "./components/LoginForm"

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
        <Router>
          <Switch>
            <Route exac path="/">
              <LoginForm palette={this.state.palette} />
            </Route>
            <Route exac path="/chat">
              <Header palette={this.state.palette} />
              <Body palette={this.state.palette} />
            </Route>
          </Switch>
        </Router>
      </>
    )
  }
}

export default App;