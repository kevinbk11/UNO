const CARD_TYPE = require("../../../Card/CARD_TYPE")
module.exports = class NoStacking{
    execute(game){
        if(game.lastCard.type==CARD_TYPE.PLUS_2 ||game.lastCard.type==CARD_TYPE.WILD_PLUS_4){
            const nextPlayer = game.getPlayer(game.caculateNextPlayerNumber())
            game.executePenaltyCardEvent(nextPlayer)
        }

    }
}