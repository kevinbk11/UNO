class RestartGameEvent extends SocketEvent{
    static self=new this()
    constructor(){
        super('RestartGameEvent')
        this.handler=(data)=>{
            GameEndDialog.dialog.hide()
            $(".CardBlock").empty()
            $(".box.top").find("img").remove()
            $(".box.left").find("img").remove()
            $(".box.right").find("img").remove()
            client.emit('InitGameRequest',this.packetBuilder
            .addData('name',this.userName)
            .addData('roomID',this.roomID)
            .addData('restart',true)
            .build())
        }
        SocketEvent.events.push(this)
    }}