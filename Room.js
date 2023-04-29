module.exports=class Room{
    static rooms=[]
    constructor(maxPlayer,rule){
        this.roomID=Math.floor(Math.random()*1000000)
        this.maxPlayer=maxPlayer
        this.rule=rule
        this.players=[]
    }
}