const app = require('express')();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const cors = require('cors');
const PORT = 5000;
const { addUser, getUser, deleteUser, getUsers } = require('./users');


app.use(cors());

io.on('connection', (socket) => {
  socket.on('login', ({ name, room }, callback) => {
    const { user, error } = addUser(socket.id, name, room);
    if (error) return callback(error);
    socket.join(user.room);
    io.in(room).emit('users', getUsers(room));
    callback();
  });

  socket.on('sendMessage', message => {
    const user = getUser(socket.id);
    io.in(user.room).emit('message', { user: user.name, text: message });
  });

  socket.on("disconnect", () => {
    console.log("User disconnected");
    const user = deleteUser(socket.id);
    if (user) {
      io.in(user.room).emit('users', getUsers(user.room));
    }
  });
});

app.get('/', (req, res) => {
  res.send("Server is up and running");
})

http.listen(PORT, () => {
  console.log(`Listening to ${PORT}`);
})