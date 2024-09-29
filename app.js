// const app = require("express")();
// const http = require("http").Server(app);

const socket = require("socket.io");

// const io = socket(http);

// app.get('/', (req,res)=>{
// res.send("Hello World")
// })

// io.on('conection', function(socket){
//     console.log('A user connected');

//     socket.on('disconnect', function(){
//         console.log('A user disconnected');
//     })
// })

// app.listen(3000, ()=> {
//     console.log(`This app is listen from port 3000`)
// })

const io = socket(3000, {
  cors: {
    origin: "http://localhost:3001", // front end web path
    method: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("A user connected");

  socket.on("message", (data) => {
    console.log(data);
    if (data.roomName.length) {
      io.to(data.roomName).emit("message", data.message);
    } else {
      io.emit("message", data.message);
    }
  });
  socket.on("joinRoom", (roomName) => {
    socket.join(roomName);
  });
  socket.on("disconnect", () => {
    console.log("A user disconnect");
  });
});
