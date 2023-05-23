const checker = require("../../RuleChecker");
const IPass = require("./IPass");
//這裡代表著你有牌一定要出。
module.exports = class NoPass extends IPass{
    execute(game,player){
        if(!checker.checkPlayerCanThrow(game,player)){
            this.draw(game,player) 
        }else{
            player.sendError('你手上有牌可以出，一定要出。')
        }
    }
}