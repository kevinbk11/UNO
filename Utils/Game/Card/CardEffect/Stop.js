module.exports = class Stop{
    execute(game,times){
        for(let i=0;i<times;i++)
            game.nowPlayer=game.caculateNextPlayer()
    }
}