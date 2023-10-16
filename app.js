const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

const multer  = require('multer')
const upload = multer({});

app.use(express.static(__dirname+'/public'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

let dados = {}
io.on('connection', (socket) => {
  console.log('a user connected');
  setInterval(() => {
   
    socket.emit('dados-atualizados', dados); // Envia os dados atualizados para o cliente
  }, 100); // 
});

app.post('/api/frames',  upload.single('image'), (req, res, next) => {
    const encoded = req.file.buffer.toString('base64');
    dados =  'data:image/jpg;base64,' + encoded;
    return res.send('User has been added successfully');
});

server.listen(3000, () => {
  console.log('listening on *:3000');
});
