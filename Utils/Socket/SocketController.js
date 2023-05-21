const mainRequestEvents = require('./SocketEvent/Events/MainPageEvents/index')
const unoRequestEvents = require('./SocketEvent/Events/UnoEvents/index')
class SocketController{
    static clients=new Set()
    static nameToClient={}
    static socketIDToUserID={}
    constructor(io){
        this.io=io
    }
    initSocketEvent(){
        this.io.on('connection',(socket) => {
            console.log('a user connected');
            for(let i = 0;i<mainRequestEvents.length;i++)   
                this.setSocketRequestEvent(socket,new mainRequestEvents[i]())
            for(let i=0;i<unoRequestEvents.length;i++)
                this.setSocketRequestEvent(socket,new unoRequestEvents[i]())
            socket.on('disconnect',()=>{
                const id = SocketController.socketIDToUserID[socket.id]
                delete SocketController.socketIDToUserID[socket.id]
                SocketController.clients.delete(id)
                Object.keys(SocketController.nameToClient).forEach((it)=>{
                    if(SocketController.nameToClient[it].id==socket.id){
                        delete SocketController.nameToClient[it]
                    }
                })
            })
          });
    }
    setSocketRequestEvent(socket,event){
        event.socket=socket
        event.clients=SocketController.clients
        event.nameToClient=SocketController.nameToClient
        event.socketIDToUserID=SocketController.socketIDToUserID
        socket.on(event.name,event.handler)
    }
}
module.exports=SocketController