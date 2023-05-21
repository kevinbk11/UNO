const checker = require("../../RuleChecker")
module.exports = class MustThrowCard{
    execute(game,player,newCard){
        console.log("??")
        if(checker.checkOneCardIsValid(game,newCard)){
            player.isDrawed=true
        }
    }
}