const PacketBuilder = require("../../../../Builder/PacketBuilder");
const checker = require("../../RuleChecker");
const IRuleStrategy = require("../IRuleStrategy");
module.exports = class IThrowCards extends IRuleStrategy{
    draw(game,player){
        //DrawOneCardRequest呼叫這裡的底下的兩個子類，然後這兩個子類會去呼叫這個東西

        //player.isDrawed=true
        const newCard = game.drawOneCard()
        player.pushCard(newCard)
        player.socket.emit('DrawOneCardRespondEvent',newCard)
        game.updateAllPlayerHandCards(game.nowPlayerNumber,1)
        game.rule.executeMustThrowCard(game,player,newCard)

        /*if(!checker.checkOneCardIsValid(game,newCard)){
            game.rule.executeMustThrowCard(game,newCard)
        }*/
    }
}