const CARD_TYPE = require("../../../Card/CARD_TYPE")
module.exports = class AllowStacking{
    execute(game){
        if((game.lastCard.type!=CARD_TYPE.PLUS_2 && game.lastCard.type!=CARD_TYPE.WILD_PLUS_4) && game.isStacking){
            game.executePenaltyCardEvent(game.getNowPlayer())
        }
    }
}