class CreateRoomRespondEvent extends SocketEvent{
    static self=new this()
    constructor(){
        super('CreateRoomRespondEvent')
        this.handler=(data)=>{
            const roomID =data.roomID   
            $("#roomID").append(`房間ID:${roomID}<br>`)
        }
        SocketEvent.events.push(this)
    }
}