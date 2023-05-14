class RuleChecker{
    static checker = new this()
    checkUno(player){
        return !(this.checkThrowMultipleCardIsValid(player.handCards) ^ player.isUno)
        //如果uno的規則部分是正確的就return true
        //也就是 如果我可以一次出完 而且我有喊UNO 就可以
        //以及 如果我不能一次出完 而且我沒喊UNO 也可以
        //這是XNOR 所以直接使用位元運算NOR和NOT來完成。
    }
    checkOneCardIsValid(game,card){
        if(card.isNoColor())return true
        if(card.number==game.lastCard.number || card.color==game.lastCard.color) return true
        else {
            game.getNowPlayer().sendError('顏色或數字必須和上一張一樣')
            return false
        }
    }
    checkThrowMultipleCardIsValid(cards){
        console.log(cards)
        let firstCard = cards[0]
        for(let i = 0;i<cards.length;i++){
            const it=cards[i]
            if(it.type!=firstCard.type || it.number!=firstCard.number)return false
        }
        return true
    }
    checkLastCardHasColor(game){
        return game.lastCard.isNoColor()
    }
}
module.exports =  RuleChecker.checker