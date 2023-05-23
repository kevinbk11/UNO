const checker = require("../../RuleChecker")
module.exports = class MustThrowCard{
    execute(game,player,newCard){
        if(checker.checkOneCardIsValid(game,newCard)){
            player.isDrawed=true
        }
        else if(checker.checkPlayerCanThrow(game,player)){
            game.endRound()
        }
    }
}