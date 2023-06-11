class RoomDissolveEvent extends SocketEvent{
    static self=new this() 
    constructor(){
        super('RoomDissolveEvent')
        this.handler=(data)=>{
            postRedirect('/',{name:data})
        }
        SocketEvent.events.push(this)
    }}