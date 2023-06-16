class PlayerJoinEvent extends SocketEvent{
    static self=new this()
    constructor(){
        super('PlayerJoinEvent')//當玩家加入該房間時觸發
        this.handler=(data)=>{
<<<<<<< HEAD
            $(`#name${data.number}`).val(data.name)
=======
            $(`.name${data.number}`).text(data.name)
>>>>>>> dev
        }
        SocketEvent.events.push(this)
    }
}