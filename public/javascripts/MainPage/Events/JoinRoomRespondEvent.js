class JoinRoomRespondEvent extends SocketEvent{
    static self=new this()
    constructor(){
        super('JoinRoomRespondEvent')
        this.handler=(data)=>{
            localStorage.setItem('sortingWithColor',$('#sortingWithColor').is(':checked'))
            postRedirect(`/room/${data.roomID}`,{name:data.name})
        }
        SocketEvent.events.push(this)
    }
}