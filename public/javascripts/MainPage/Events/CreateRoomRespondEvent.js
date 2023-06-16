class CreateRoomRespondEvent extends SocketEvent{
    static self=new this()
    constructor(){
        super('CreateRoomRespondEvent')
        this.handler=(data)=>{
            localStorage.setItem('sortingWithColor',$('#sortingWithColor').is(':checked'))
            postRedirect(`/room/${data.roomID}`,{name:data.name})
        }
        SocketEvent.events.push(this)
    }
}