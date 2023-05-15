const CARD_TYPE = require("../../../Card/CARD_TYPE");
const IRuleStrategy = require("../IRuleStrategy");
module.exports = class IStacking extends IRuleStrategy{
    lastIsPlus(card){
        return (card.type==CARD_TYPE.PLUS_2 || card.type==CARD_TYPE.WILD_PLUS_4)
    }
}