class PlayerJoinEvent extends SocketEvent{
    static self=new this()
    constructor(){
        super('PlayerJoinEvent')
        this.handler=(data)=>{
            data=JSON.parse(data)
            
            $("#content").append(`${data.number}.${data.id}<br>`)
        }
        SocketEvent.events.push(this)
    }
}