let Room = require('../Room')
const SocketController = require('../SocketController')
module.exports=class CreateRoomRequest{
    constructor(){
        this.socket
        this.clients
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
                Room.rooms.push(room)
                console.log(`新房間${room.roomID}已被創建`)
            }
            else console.log('error')
        }
    }
}