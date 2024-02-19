// // our server

// // Inside index.js, Import express with require keyword
// const app = require("express")() ;

// // create an app by calling the express() function provided by the express framework
// const server= require("http").createServer(app) ;

// //middleware for cross origin request - useful in deploying
// const cors= require("cors") ;

// const io= require("socket.io")(server,{
//     cors: {
//         origin: "*", //to allow access from all origins
//         methods: ["GET","POST"] 
//     }
// }) ;

// app.use(cors()) ;

// const PORT= process.env.PORT || 5000 ;

// app.get("/", (req,res) => {
//     res.send("Server is running surbs and she is liking it") ;
// });

// io.on('connection', (socket) =>{
//     socket.emit('me', socket.id) ;
//     socket.on('disconnect',()=>{
//         socket.broadcast.emit("callended") ;
//     })
//     socket.on("calluser",({userToCall, signalData, from , name})=>{
//         io.to(userToCall).emit("calluser",{signal: signalData, from, name}) ;
//     })
//     socket.on("answercall",(data)=>{
//         io.to(data.to).emit("callaccepted", data.signal) ;
//     })
// })

// server.listen(PORT,()=> console.log(`Server listening on port ${PORT}`));


const app = require("express")();
const server = require("http").createServer(app);
const cors = require("cors");

const io = require("socket.io")(server, {
	cors: {
		origin: "*",
		methods: [ "GET", "POST" ]
	}
});

app.use(cors());

const PORT = process.env.PORT || 5000;

app.get('/', (req, res) => {
	res.send('Running');
});

io.on("connection", (socket) => {
	socket.emit("me", socket.id);

	socket.on("disconnect", () => {
		socket.broadcast.emit("callEnded")
	});

	socket.on("callUser", ({ userToCall, signalData, from, name }) => {
		io.to(userToCall).emit("callUser", { signal: signalData, from, name });
	});

	socket.on("answerCall", (data) => {
		io.to(data.to).emit("callAccepted", data.signal)
	});
});

server.listen(PORT, () => console.log(`Server is running on port ${PORT}`));