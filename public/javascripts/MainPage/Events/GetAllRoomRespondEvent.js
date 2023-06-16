class GetAllRoomRespondEvent extends SocketEvent{
    static self = new this()
    constructor(){
        super('GetAllRoomRespondEvent')     
        this.handler=(data)=>{
            JoinRoomDialog.dialog.updateRooms(data.rooms)
        }
        SocketEvent.events.push(this)
    }
}