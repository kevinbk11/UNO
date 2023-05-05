const CARD_COLOR = require("./Game/Card/CARD_COLOR")
const CARD_TYPE = require("./Game/Card/CARD_TYPE")
const Card = require("./Game/Card/Card")

module.exports=class CardProcessor{
    static processor = this()
    fromStringToCard(s){
        if(s=='+4'){
            return new Card(null,null,CARD_TYPE.WILD_PLUS_4)
        }
        if(s=='wild'){
            return new Card(null,null,CARD_TYPE.WILD)
        }
    }
}