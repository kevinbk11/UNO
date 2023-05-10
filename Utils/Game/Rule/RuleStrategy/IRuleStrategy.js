module.exports = class IRuleStrategy{
    execute(){}
    checkOneCardIsValid(game,card){
        if(card.isNoColor())return true
        if(card.number==game.lastCard.number || card.color==game.lastCard.color) return true
        else {
            game.getNowPlayer().sendError('顏色或數字必須和上一張一樣')
            return false
        }
    }
}