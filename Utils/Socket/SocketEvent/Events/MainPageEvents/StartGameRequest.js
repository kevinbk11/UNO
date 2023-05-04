let Room = require('../../../../Game/Room')
const SocketEvent = require('../../SocketEvent')
const builder = require('../../../../Builder/PacketBuilder')
const Game = require('../../../../Game/Game')
const Rule = require('../../../../Game/Rule')
module.exports=class StartGameRequest extends SocketEvent{
    constructor(){
        super()
        this.name='StartGameRequest'
        this.handler=data=>{
            if(this.clients.includes(data.id)){
                data=data.data
                Room.rooms[data.roomID].players.forEach(player=>{
                    this.nameToClient[player].emit('GameStartEvent',builder
                    .addData('roomID',data.roomID)
                    .addData('name',player)
                    .build())
                    delete this.nameToClient[player]
                })
                let game=new Game(Room.rooms[data.roomID].players,new Rule(),data.roomID)
                Game.games[data.roomID]=game

            }  
        }
    }
}
