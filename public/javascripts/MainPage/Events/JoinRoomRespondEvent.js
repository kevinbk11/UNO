class JoinRoomRespondEvent extends SocketEvent{
    static self=new this()
    constructor(){
        super('JoinRoomRespondEvent')
        this.handler=(data)=>{
            const players = data.players.toString().split(',')
            const roomID = data.roomID
            let num=1;
            $("#roomID").append(`房間ID:${roomID}<br>`)
            players.forEach(it=>{
                $("#content").append(`${num++}.${it}<br>`)
            })
            $('.RoomButton').hide()
            JoinRoomDialog.dialog.hide()
        }
        SocketEvent.events.push(this)
    }
}