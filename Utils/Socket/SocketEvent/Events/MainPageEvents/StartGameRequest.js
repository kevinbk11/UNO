let Room = require('../../../../Game/Room')
const SocketEvent = require('../../SocketEvent')
const builder = require('../../../../Builder/PacketBuilder')
const Game = require('../../../../Game/Game')
const Rule = require('../../../../Game/Rule/Rule')
const Player = require('../../../../Game/Player')
module.exports=class StartGameRequest extends SocketEvent{
    constructor(){
        super()
        this.name='StartGameRequest'
        this.handler=data=>{
            if(this.clients.has(data.id)){
                data=data.data
                const players=[]
                Room.rooms[data.roomID].players.forEach(name=>{
                    this.nameToClient[name].emit('GameStartEvent',builder
                    .addData('roomID',data.roomID)
                    .addData('name',name)
                    .build())
                    delete this.nameToClient[name]
                    players.push(new Player(name))
                })
                let game=new Game(players,Rule.buildRule(data.rule),data.roomID)
                game.init()
                Game.games[data.roomID]=game

            }  
        }
    }
}
