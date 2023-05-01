let Room = require('../Room')
const SocketEvent = require('./SocketEvent')
const builder = require('../PacketBuilder')
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
                            this.idToClient[player].emit('PlayerJoinEvent',builder.addData('id',id).addData('number',it.players.length+1).build())
                        })
                        it.players.push(id)
                        this.socket.emit('JoinGameEvent',builder.addData('players',it.players).build())
                    }

                    //接下來實作一些回傳給房客的東西
                })
            }
            else console.log('error')
        }
    }
}