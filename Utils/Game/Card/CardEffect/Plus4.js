const IPlus = require("./IPlus")

module.exports = class Plus4 extends IPlus {
    execute(game,times){
        this.plus(game,4,times)
        const player = game.getNowPlayer()
        player.socket.emit('ChoiceColorEvent')
    }
}