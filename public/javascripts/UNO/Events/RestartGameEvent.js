class RestartGameEvent extends SocketEvent{
    static self=new this()
    constructor(){
        super('RestartGameEvent')
        this.handler=(data)=>{
            GameEndDialog.dialog.hide()
            $(".CardBlock").empty()
            $(".top").empty()
            $(".left").empty()
            $(".right").empty()
            client.emit('InitGameRequest',this.packetBuilder
            .addData('name',this.userName)
            .addData('roomID',this.roomID)
            .addData('restart',true)
            .build())
        }
        SocketEvent.events.push(this)
    }}