class PlayerJoinEvent extends SocketEvent{
    static self=new this()
    constructor(){
        super('PlayerJoinEvent')//當玩家加入該房間時觸發
        this.handler=(data)=>{
            $("#content").append(`${data.number}.${data.name}<br>`)
        }
        SocketEvent.events.push(this)
    }
}