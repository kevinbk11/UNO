module.exports=class Room{
    static rooms={}
    constructor(maxPlayer,rule){
        this.roomID=Math.floor(Math.random()*1000000).toString()
        this.maxPlayer=maxPlayer
        this.rule=rule
        this.players=[]
        this.readySet = new Set()
    }
    getPlayerNumber(name){
        return this.players.indexOf(name)+1
    }
}