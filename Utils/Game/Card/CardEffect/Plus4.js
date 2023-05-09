module.exports = class Plus4{
    execute(game,times){
        game.isStacking=true
        for(let i=0;i<4*times;i++){
            game.penaltyCardPile.push(game.drawOneCard())
        }
        const player = game.getNowPlayer()
        player.socket.emit('ChoiceColorEvent')
    }
}