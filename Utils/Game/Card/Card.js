const CARD_TYPE = require("./CARD_TYPE")

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
    setEffect(){
        if(this.type==CARD_TYPE.PLUS_2){

        }
    }
    static buildCard(cardDict){
        return new Card(cardDict.color,cardDict.number,cardDict.type)
    }
}