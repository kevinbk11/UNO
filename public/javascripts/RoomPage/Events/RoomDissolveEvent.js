class RoomDissolveEvent extends SocketEvent{
    static self=new this() 
    constructor(){
        super('RoomDissolveEvent')
        this.handler=(data)=>{
            alert('房主已解散房間，稍後自動跳轉回主頁面。')
            setTimeout(()=>{
                postRedirect('/',{name:data})
            },600)
            
        }
        SocketEvent.events.push(this)
    }}