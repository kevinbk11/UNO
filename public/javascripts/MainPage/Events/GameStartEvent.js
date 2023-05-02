class GameStartEvent extends SocketEvent{
    static self = new this()
    constructor(){
        super('GameStartEvent')
        this.handler=(data)=>{
            $(location).prop('href', `/game/${data.roomID}`)
        }
        SocketEvent.events.push(this)
    }
}