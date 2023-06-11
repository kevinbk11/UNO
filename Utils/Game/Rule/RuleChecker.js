class RuleChecker {
    static checker = new this()
    checkUno(player,game) {
        if(game.rule.isAllowThrowMultipleCard){
            return !(this.checkThrowMultipleCardIsValid(player.handCards) ^ player.isUno)
        }
        else return player.isUno ^  player.handCards.length!=1
        //如果uno的規則部分是正確的就return true
        //也就是 如果我可以一次出完 而且我有喊UNO 就可以
        //以及 如果我不能一次出完 而且我沒喊UNO 也可以
        //這是XNOR 所以直接使用位元運算NOR和NOT來完成。
    }
    checkOneCardIsValid(game, card) {
        if (card.isNoColor()) return true
        return (card.number == game.lastCard.number || card.color == game.lastCard.color)
    }
    checkThrowMultipleCardIsValid(cards) {
        let firstCard = cards[0]
        for (let i = 0; i < cards.length; i++) {
            const it = cards[i]
            if (it.type != firstCard.type || it.number != firstCard.number) return false
        }
        return true
    }
    checkLastCardHasColor(game) {
        return game.lastCard.isNoColor()
    }
    checkPlayerCanThrow(game, player) {
        for (let i = 0; i < player.handCards.length; i++) {
            if (this.checkOneCardIsValid(game, player.handCards[i])) {
                return true
            }
        }
        return false
    }
}
module.exports = RuleChecker.checker