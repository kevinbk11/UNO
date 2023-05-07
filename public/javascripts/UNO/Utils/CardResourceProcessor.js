class CardResourceProcessor{
    static processor = new this()
    getCardImageResource(card){
        if(card.type=='number')return `/images/cards/${card.color}-${card.number}.png`
        else if(card.color==null)return `/images/cards/${card.type}.png`
        else return `/images/cards/${card.color}-${card.type}.png`
    }
    setAllCardUnchoiced(){
        $('.CardBlock img').removeClass('choiced')
        $('.CardBlock img').addClass('notChoiced')
    }
    buildCard(){

    }
}