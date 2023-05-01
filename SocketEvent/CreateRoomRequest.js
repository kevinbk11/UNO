let Room = require('../Room')
const SocketController = require('../SocketController')
const SocketEvent = require('./SocketEvent')
module.exports=class CreateRoomRequest extends SocketEvent{
    constructor(){
        super()
        this.name="CreateRoomRequest"
        this.handler=
        data=>{
            
            try{
                data=JSON.parse(data)
            }
            catch{
                console.log('error')
                return
            }
            
            if(this.clients.includes(data.id)){
                let room = new Room(4,JSON.parse(JSON.parse(data.data).rule))
                room.players.push(data.id)
                Room.rooms[room.roomID]=room
                console.log(`房間${room.roomID}被創建了`)
            }
            else console.log('error')
        }
    }
}