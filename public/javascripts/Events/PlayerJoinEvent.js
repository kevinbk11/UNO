class PlayerJoinEvent extends Event{
    static self=new this()
    constructor(){
        super('PlayerJoinEvent')
        this.handler=(data)=>{
            alert(data)
        }
        SocketEvent.events.push(this)
    }
}