//const io = require('socket.io')(5000);
//const cors = require('cors')
const http = require("http");
const socket = require("socket.io");

const cors = require('cors')
const server = http.createServer(app.callback())
const io = socket(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"]
  }
});

const SERVER_HOST = 'localhost'
const SERVER_PORT = 5000
server.listen(SERVER_PORT, SERVER_HOST, () => {
  console.log(`[HTTP] Listen => Server is running at http://${SERVER_HOST}:${SERVER_PORT}`)
  console.log('[HTTP] Listen => Press CTRL+C to stop it')
})

io.on('connection', socket => {
  const id = socket.handshake.query.id;
  socket.join(id);

  socket.on('send-message', ({ recipients, text }) => {
    recipients.forEach(recipient => {
      const newRecipients = recipients.filter(r => r !== recipient);
      newRecipients.push(id);
      socket.broadcast.to(recipient).emit('receive-message', {
        recipients: newRecipients, sender: id, text
      });
    });
  });
});
