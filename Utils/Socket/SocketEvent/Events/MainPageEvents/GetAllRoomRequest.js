let Room = require('../../../../Game/Room')
const SocketEvent = require('../../SocketEvent')
const builder = require('../../../../Builder/PacketBuilder')
module.exports=class GetAllRoomRequest extends SocketEvent{
    constructor(){
        super()
        this.name="GetAllRoomRequest"
        this.handler=data=>{
            if(this.clients.has(data.id)){
                this.socket.emit('GetAllRoomRespondEvent',builder.addData('rooms', Object.keys(Room.rooms)).build())
            }
            
            else console.log('error')
        }
    }
}