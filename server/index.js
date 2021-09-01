const express = require('express')
const app = express()
const WSServer = require('express-ws')(app)
const aWss = WSServer.getWss()
const PORT = process.env.PORT || 5000

app.ws('/', (ws, req) => {
   console.log('Connection - true')
   ws.send('succesful connection')
   msg = JSON.parse(req)
   ws.on('mesage', (msg) => {
      switch (msg.method) {
         case "CONNECTION":
            connectionHandler(ws, msg)
            break
         case "DRAW": 
            broadcastConnection(ws, msg)
            break

      }
   })
})

app.listen(PORT, () => console.log('server start on port: ' + PORT))

const connectionHandler = (ws, msg) => {
   ws.id = msg.id
   broadcastConnection(ws, msg)
}

const broadcastConnection = (ws, msg) => {
   aWss.clients.forEach(client => {
      if (client.id === msg.id) {
         client.send(JSON.stringify(msg))
      }
   })
}