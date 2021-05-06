import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { w3cwebsocket as WebSocket } from "websocket"

const client = new WebSocket("ws://localhost:61000")

client.onopen = event =>
{
  console.log("connected")

  const string = "salv1e sono il famosissimo famosissimo famosissimofamosissimo famosissimofamosissimofamosissimofamosissimofamosissimofamosissimofamosissimofamosissimo"

  console.log(string.length)

  client.send(string)
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);