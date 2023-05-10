const CARD_TYPE = require("../../../Card/CARD_TYPE");
const IRuleStrategy = require("../IRuleStrategy");
module.exports = class IStacking extends IRuleStrategy{
    lastIsPlus(game){
        return (game.lastCard.type==CARD_TYPE.PLUS_2 || game.lastCard.type==CARD_TYPE.WILD_PLUS_4)
    }
}