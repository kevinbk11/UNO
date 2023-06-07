const IPass = require("./IPass");
//這裡代表著你有牌不一定要出。
module.exports = class AllowPass extends IPass{
    execute(game,player){
        this.draw(game,player)
    }
}