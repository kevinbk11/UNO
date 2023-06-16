class JoinRoomRespondEvent extends SocketEvent{
    static self=new this()
    constructor(){
        super('JoinRoomRespondEvent')
        this.handler=(data)=>{
            if(data!=false){
                localStorage.setItem('sortingWithColor',$('#sortingWithColor').is(':checked'))
                postRedirect(`/room/${data.roomID}`,{name:data.name})
            }
            else{
                alert("房間已滿!!")
            }
        }
        SocketEvent.events.push(this)
    }
}