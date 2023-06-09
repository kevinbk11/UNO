const Room = require("../../../../Game/Room");
const SocketEvent = require("../../SocketEvent");
const PacketBuilder = require('../../../../Builder/PacketBuilder');
const Game = require("../../../../Game/Game");
const Card = require("../../../../Game/Card/Card");
const AllowMultipleThrow = require("../../../../Game/Rule/RuleStrategy/MultipleThrow/AllowMultipleThrow");
module.exports = class UnoRequest extends SocketEvent{
    constructor(){
        super()
        this.name='UnoRequest'
        this.handler=data=>{
            if(this.clients.has(data.id)){
                data=data.data
                const game = Game.games[data.roomID] 
                const player = game.getPlayerByName(data.name)
                if(game.getNowPlayer().name==player.name){
                    if(!player.isUno){
                        player.isUno=true
                        game.players.forEach((it)=>{
                            it.socket.emit('PlayerUnoEvent',data.name)
                        })
                    }
                    
                }
                    
                    
            }
        }
    }
}