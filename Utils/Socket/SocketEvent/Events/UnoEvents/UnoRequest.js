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
            if(this.clients.includes(data.id)){
                data=data.data
                const game = Game.games[data.roomID] 
                const player = game.getPlayerByName(data.name)
                player.isUno=true
            }
        }
    }
}