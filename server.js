const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

let onlineUsers = 0;

io.on('connection', (socket) => {
  console.log('A user connected');
  onlineUsers++;
  io.emit('user count', onlineUsers);

  socket.on('chat message', ({username, msg}) => {
    io.emit('chat message', {username, msg});
  });

  socket.on('disconnect', () => {
    console.log('User disconnected');
    onlineUsers--;
    io.emit('user count', onlineUsers);
  });
});

http.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
