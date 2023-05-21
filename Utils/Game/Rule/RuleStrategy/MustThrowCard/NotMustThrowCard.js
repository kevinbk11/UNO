const checker = require("../../RuleChecker")
module.exports = class NotMustThrowCard{
    execute(game,player,newCard){
        console.log("???")
        player.isDrawed=true
        if(!checker.checkOneCardIsValid(game,newCard)){
            game.endRound()
        }
    }
}