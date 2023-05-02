class SocketEvent{
    static events=[]
    constructor(name){
        this.name=name;
        this.handler;
    }
}