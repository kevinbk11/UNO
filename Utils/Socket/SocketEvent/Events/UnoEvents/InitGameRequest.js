const Room = require("../../../../Game/Room");
const SocketEvent = require("../../SocketEvent");
const PacketBuilder = require('../../../../Builder/PacketBuilder');
const Game = require("../../../../Game/Game");
module.exports = class InitGameRequest extends SocketEvent{
    constructor(){
        //重新設定玩家名字和連線的key:value
        //給玩家遊戲編號，決定前端排版
        super()
        this.name='InitGameRequest'
        this.handler=data=>{
            try{
                if(this.clients.includes(data.id)){
                    data=data.data
                    this.nameToClient[data.name]=this.socket
                    const room=Room.rooms[data.roomID]
                    const game = Game.games[data.roomID]
                    const number = room.players.indexOf(data.name)+1
                    const cards=[]
        
                    for(let i=0;i<7;i++)cards.push(game.drawOneCard())
                    this.socket.emit('InitGameRespondEvent',PacketBuilder
                    .addData('number',number)
                    .addData('cards',cards)
                    .addData('players',room.players)
                    .build())
                    game.players[number-1].handCards=cards  
                }

            }
            catch{

            }
        }
    }
}