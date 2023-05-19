class ReadyRespondEvent extends SocketEvent{
    static self=new this() 
    constructor(){
        super('ReadyRespondEvent')
        this.handler=data=>{
            console.log(data)
            $(`#gameEndDialog #player${data.number+1}`).text(`${data.number+1}.${data.name}✔️`)
            if(data.isAllReady && data.isRoomHost){
                $('#gameEndDialog #startButton').show()
            }
                
        }
        SocketEvent.events.push(this)
    }
}