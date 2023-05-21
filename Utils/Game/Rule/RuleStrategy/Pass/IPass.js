const checker = require("../../RuleChecker");
const IRuleStrategy = require("../IRuleStrategy");
module.exports = class IThrowCards extends IRuleStrategy{
    draw(game,player){
        player.isDrawed=true
        const newCard = game.drawOneCard()
        player.pushCard(newCard)
        player.socket.emit('DrawOneCardRespondEvent',newCard)
        if(!checker.checkOneCardIsValid(game,newCard)){
            game.endRound()
        }
    }
}