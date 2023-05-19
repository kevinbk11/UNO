module.exports = class Stop{
    execute(game,times){
        for(let i=0;i<times;i++)
            game.nowPlayerNumber=game.caculateNextPlayerNumber()
    }
}