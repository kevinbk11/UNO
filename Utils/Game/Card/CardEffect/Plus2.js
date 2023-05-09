const IPlus = require("./IPlus")

module.exports = class Plus2 extends IPlus{
    execute(game,times){
        this.plus(game,2,times)
    }
}