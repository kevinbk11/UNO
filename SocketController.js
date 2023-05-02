const requestEvents = require('./SocketEvent/index')
class SocketController{
    static clients=[]
    static nameToClient={}
    constructor(io){
        this.io=io
    }
    initSocketEvent(){
        this.io.on('connection',(socket) => {
            console.log('a user connected');
            for(let i = 0;i<requestEvents.length;i++)
                this.setSocketRequestEvent(socket,new requestEvents[i]())
          });
    }
    setSocketRequestEvent(socket,event){
        event.socket=socket
        event.clients=SocketController.clients
        event.nameToClient=SocketController.nameToClient
        socket.on(event.name,event.handler)
    }
}
module.exports=SocketController