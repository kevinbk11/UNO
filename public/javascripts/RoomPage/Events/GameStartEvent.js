class GameStartEvent extends SocketEvent{
    static self = new this()
    constructor(){
        super('GameStartEvent')     
        this.handler=(data)=>{//post傳遞自身名稱並重新導向
            postRedirect(`/game/${data.roomID}`,{name:data.name})
        }
        SocketEvent.events.push(this)
    }
}