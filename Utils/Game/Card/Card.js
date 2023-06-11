const CARD_COLOR = require("./CARD_COLOR")
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
    getInfo(){
        let colorString="";
        switch(this.color){
            case 'red':
                colorString="紅色"
                break
            case 'yellow':
                colorString="黃色"
                break
            case 'blue':
                colorString="藍色"
                break
            case 'green':
                colorString="綠色"
                break
        }
        let numberOrType=""
        if(this.number>9){
            switch(this.type){
                case 'stop':
                    numberOrType="暫停"
                    break
                case 'reverse':
                    numberOrType="迴轉"
                    break
                case '+2':
                    numberOrType="+2"
                    break
                case 'wild':
                    numberOrType="調色盤"
                    break
                case '+4':
                    numberOrType="+4"
                    break
            }
        }
        else{
            numberOrType=this.number
        }
        return colorString+numberOrType
    }
    static buildCard(cardDict){
        return new Card(cardDict.color,cardDict.number,cardDict.type)
    }
}