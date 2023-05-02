const SocketEvent = require("../SocketEvent");

module.exports=class VerifyRequest extends SocketEvent{
    constructor(){
        super()
        this.name='VerifyRequest'
        this.handler=
        data=>{

            
            if(this.clients.includes(data.password)){
                this.socket.emit('VerifyRespond',{success:'true',data:data.password})
                this.nameToClient[data.name]=this.socket
            }
                
            else this.socket.emit('VerifyRespond',false)
        }
    }
}
