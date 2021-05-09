import React from "react"

const primary = {
    textColor: "#ffffff",
    color: "#37474f",
    light: "#62727b",
    dark: "#102027"
}
  
const secondary = {
    textColor: "#ffffff",
    color: "#546e7a",
    light: "#819ca9",
    dark: "#29434e"
}

const ThemeContext = React.createContext()

export { ThemeContext, primary, secondary }