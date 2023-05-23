const SocketEvent = require("../../../SocketEvent/SocketEvent");

module.exports=class VerifyRequest extends SocketEvent{
    constructor(){
        super()
        this.name='VerifyRequest'
        this.handler=data=>{//驗證
            if(this.clients.has(data.password)){
                this.socket.emit('VerifyRespond',{success:'true',data:data.password})
                this.nameToClient[data.name]=this.socket
                this.socketIDToUserID[this.socket.id]=data.password
            }
            else this.socket.emit('VerifyRespond',false)
        }
    }
}
