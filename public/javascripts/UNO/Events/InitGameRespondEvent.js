class InitGameRespondEvent extends SocketEvent{
    static self=new this()
    constructor(){
        super('InitGameRespondEvent')
        this.handler=(data)=>{
            alert(data.number)
        }
        SocketEvent.events.push(this)
    }
}