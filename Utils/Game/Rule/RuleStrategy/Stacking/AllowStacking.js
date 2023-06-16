const CARD_TYPE = require("../../../Card/CARD_TYPE")
const IStacking = require("./IStacking")
module.exports = class AllowStacking extends IStacking{
    execute(game,playerNumber,droppedCards){
        if((!this.lastIsPlus(game.lastCard) || droppedCards==null) && game.isStacking){
            const player = game.getPlayer(playerNumber)
            game.executePenaltyCardEvent(player)
            game.players.forEach(it=>{
                it.socket.emit('StackingEvent',-1)
            })
        }
        else if(this.lastIsPlus(game.lastCard)){
            game.players.forEach(it=>{
                it.socket.emit('StackingEvent',game.penaltyCardPile.length)
            })
        }
    }
}