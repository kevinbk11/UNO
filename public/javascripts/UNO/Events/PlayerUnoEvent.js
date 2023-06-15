class PlayerUnoEvent extends SocketEvent{
    static self=new this()
    constructor(){
        super('PlayerUnoEvent')
        this.handler=(data)=>{
            $('#unoMessage').text(`玩家${data}喊出了UNO!!`)
            UnoDialog.dialog.show()
            setTimeout(()=>{
                UnoDialog.dialog.hide()
            },700)
            
        }
        SocketEvent.events.push(this)
    }}