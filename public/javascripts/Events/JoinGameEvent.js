class JoinGameEvent extends SocketEvent{
    static self=new this()
    constructor(){
        super('JoinGameEvent')
        this.handler=(data)=>{
            data=JSON.parse(data)
            const players = data.players.toString().split(',')
            let num=1;
            players.forEach(it=>{
                $("#content").append(`${num++}.${it}<br>`)
            })

        }
        SocketEvent.events.push(this)
    }
}