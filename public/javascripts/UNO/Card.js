class Card{
    constructor(color,number,type){
        this.color=color
        this.number=number
        this.type=type
    }
    isEqual(card){
        return this.color==card.color && this.number==card.number && this.type==card.type   
    }
    isEqual(color,number,type){
        return this.color==color && this.number==number && this.type==type
    }
}