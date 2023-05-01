const SocketEvent = require("./SocketEvent");

module.exports=class VerifyRequest extends SocketEvent{
    constructor(){
        super()
        this.name='VerifyRequest'
        this.handler=
        data=>{
            if(this.clients.includes(data)){
                this.socket.emit('VerifyResult',{success:'true',data:data})
                this.idToClient[data]=this.socket
            }
                
            else this.socket.emit('VerifyResult',false)
        }
    }
}
