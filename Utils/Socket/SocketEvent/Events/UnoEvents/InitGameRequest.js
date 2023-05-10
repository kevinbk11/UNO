const Room = require("../../../../Game/Room");
const SocketEvent = require("../../SocketEvent");
const PacketBuilder = require('../../../../Builder/PacketBuilder');
const Game = require("../../../../Game/Game");
module.exports = class InitGameRequest extends SocketEvent{
    constructor(){
        super()
        this.name='InitGameRequest'
        this.handler=data=>{
            try{
                if(this.clients.includes(data.id)){
                    data=data.data
                    this.nameToClient[data.name]=this.socket
                    const room=Room.rooms[data.roomID]
                    const game = Game.games[data.roomID]
                    const number = room.getPlayerNumber(data.name)
                    const cards=[]
                    for(let i=0;i<7;i++)cards.push(game.drawOneCard())
                    this.socket.emit('InitGameRespondEvent',PacketBuilder
                    .addData('number',number)
                    .addData('cards',cards)
                    .addData('players',room.players)
                    .addData('firstCard',game.lastCard)
                    .build())
                    game.getPlayer(number-1).handCards=cards
                    game.getPlayer(number-1).socket=this.socket
                    game.getPlayer(number-1).game=game

                }

            }
            catch{

            }
        }
    }
}