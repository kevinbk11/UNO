class JoinRoomRespondEvent extends SocketEvent{
    static self=new this()
    constructor(){
        super('JoinRoomRespondEvent')
        this.handler=(data)=>{
            postRedirect(`/room/${data.roomID}`,{name:data.name})
        }
        SocketEvent.events.push(this)
    }
}