class YouLoseEvent extends SocketEvent{
    static self=new this() 
    constructor(){
        super('YouLoseEvent')
        this.hand=[]

        this.handler=(data)=>{
            const dialog = GameEndDialog.dialog
            dialog.show()
            dialog.setPlayersName(data.playersName)
            dialog.setWinner(data.winnerName)
        }
        SocketEvent.events.push(this)
    }
}