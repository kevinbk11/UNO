module.exports=class VerifyRequest{
    constructor(){
        this.name='VerifyRequest'
        this.socket;
        this.clients;
        this.handler=
        data=>{
            if(this.clients.includes(data))
                this.socket.emit('VerifyResult',{success:'true',data:data})
            else 
                this.socket.emit('VerifyResult',false)
        }
    }
}
