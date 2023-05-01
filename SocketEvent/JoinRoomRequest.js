let Room = require('../Room')
const SocketEvent = require('./SocketEvent')
module.exports=class JoinRoomRequest extends SocketEvent{
    constructor(){
        super()
        this.name="JoinRoomRequest"
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
                let id =data.id
                data=JSON.parse(data.data)
                Room.rooms.forEach((it)=>{

                    if(it.roomID==data.roomID){
                        it.players.forEach(player=>{
                            this.idToClient[player].emit('PlayerJoin')
                        })
                        it.players.push(id)

                    }

                    //接下來實作一些回傳給房客的東西
                })
            }
            else console.log('error')
        }
    }
}