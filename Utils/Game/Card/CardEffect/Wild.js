module.exports = class Wild{
    execute(game,times){
        const player = game.getNowPlayer()
        player.socket.emit('ChoiceColorEvent')
    }
}