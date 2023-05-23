const CARD_TYPE = require("./CARD_TYPE")
const NullEffect = require("./CardEffect/NullEffect")
const Plus2 = require("./CardEffect/Plus2")
const Plus4 = require("./CardEffect/Plus4")
const Reverse = require("./CardEffect/Reverse")
const Stop = require("./CardEffect/Stop")
const Wild = require("./CardEffect/Wild")

module.exports=class Card{
    constructor(color,number,type){
        this.color=color
        this.number=number
        this.type=type
        this.effect=this.setEffect()
    }
    isEqual(card){
        return this.color==card.color && this.number==card.number && this.type==card.type   
    }
    isNoColor(){
        return this.color==null
    }
    executeEffect(game,times){
        this.effect.execute(game,times)
    }
    setEffect(){ 
        switch(this.type){
            case CARD_TYPE.NUMBER:
                return new NullEffect()
            case CARD_TYPE.PLUS_2:
                return new Plus2()
            case CARD_TYPE.REVERSE:
                return new Reverse()
            case CARD_TYPE.STOP:
                return new Stop()
            case CARD_TYPE.WILD_PLUS_4:
                return new Plus4()
            case CARD_TYPE.WILD:
                return new Wild()
        }
    }
    static buildCard(cardDict){
        return new Card(cardDict.color,cardDict.number,cardDict.type)
    }
}