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

// app.post('/image', (req, res) => {
//    try {
//       const data = req.body.img.replace(`data:image/png;base64,`, '')
//       fs.writeFileSync(path.resolve(__dirname, 'files', `${req.query.id}.jpg`), data, 'base64')
//       return res.status(200).json({ message: "Loaded" })
//    } catch (e) {
//       console.log(e)
//       return res.status(500).json('error')
//    }
// })
// app.get('/image', (req, res) => {
//    try {
//       const file = fs.readFileSync(path.resolve(__dirname, 'files', `${req.query.id}.jpg`))
//       const data = `data:image/png;base64,` + file.toString('base64')
//       res.json(data)
//    } catch (e) {
//       console.log(e)
//       return res.status(500).json('error')
//    }
// })