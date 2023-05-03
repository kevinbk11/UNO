let Room = require('../../../Room')
const SocketEvent = require('../../SocketEvent')
const builder = require('../../../PacketBuilder')
module.exports=class CreateRoomRequest extends SocketEvent{
    constructor(){
        super()
        this.name="CreateRoomRequest"
        this.handler=data=>{
            if(this.clients.includes(data.id)){
                data=data.data
                let room = new Room(4,data.rule)
                room.players.push(data.name)
                Room.rooms[room.roomID]=room
                console.log(`房間${room.roomID}被創建了`)
                this.socket.emit('CreateRoomRespondEvent',builder.addData('roomID',room.roomID).build())
            }
            
            else console.log('error')
        }
    }
}