module.exports = class Reverse{
    execute(game,times){
        for(let i=0;i<times;i++)
            game.order*=-1
    }
}