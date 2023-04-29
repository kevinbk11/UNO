let Room = require('../Room')
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
                console.log()
                let room = new Room(4,JSON.parse(JSON.parse(data.data).rule))
                room.players.push(data.id)
                Room.rooms.push(room)
                console.log(Room.rooms)
            }
            else console.log('error')
        }
    }
}