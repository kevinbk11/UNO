const PacketBuilder = require("../../../../Builder/PacketBuilder");
const Game = require("../../../../Game/Game");
const checker = require("../../../../Game/Rule/RuleChecker");
const SocketEvent = require("../../SocketEvent");

module.exports = class DrawOneCardRequest extends SocketEvent{
    constructor(){
        super()
        this.name='DrawOneCardRequest'
        this.handler=data=>{
            if(this.clients.has(data.id)){
                data=data.data
                const game = Game.games[data.roomID]
                const player = game.getPlayerByName(data.name)

                if(game.isCorrectPlayerThrowing(data.name) && !player.isDrawed){
                    
                    if(game.lastCard.isNoColor())
                        player.sendError('卡牌顏色尚未被決定好')
                    else
                        game.rule.executePassStrategy(game,player)
                    
                    
                }
            }
        
        }
    }
}