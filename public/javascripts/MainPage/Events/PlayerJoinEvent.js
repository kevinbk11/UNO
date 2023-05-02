class PlayerJoinEvent extends SocketEvent{
    static self=new this()
    constructor(){
        super('PlayerJoinEvent')
        this.handler=(data)=>{
            
            $("#content").append(`${data.number}.${data.name}<br>`)
        }
        SocketEvent.events.push(this)
    }
}