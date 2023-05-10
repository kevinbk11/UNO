const CARD_TYPE = require("../../../Card/CARD_TYPE")
const IStacking = require("./IStacking")
module.exports = class AllowStacking extends IStacking{
    execute(game,playerNumber){
        if(!this.lastIsPlus(game) && game.isStacking){
            const player = game.getPlayer(playerNumber)
            game.executePenaltyCardEvent(player)
        }
    }
}