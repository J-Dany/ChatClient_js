import React from "react"

const primary = {
    textColor: "#ffffff",
    color: "#37474f",
    light: "#62727b",
    dark: "#102027"
}
  
const secondary = {
    textColor: "#000000",
    color: "#f5f5f5",
    light: "#ffffff",
    dark: "#c2c2c2"
}

const ThemeContext = React.createContext()

export { ThemeContext, primary, secondary }