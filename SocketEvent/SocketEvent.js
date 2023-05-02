module.exports=class SocketEvent{
    static events=[]
    constructor(){
        this.socket;
        this.clients;
        this.nameToClient;
    }
}