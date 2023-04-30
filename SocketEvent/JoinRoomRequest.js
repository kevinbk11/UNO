let Room = require('../Room')
module.exports=class JoinRoomRequest{
    constructor(){
        this.socket
        this.clients
        this.name="JoinRoomRequest"
        this.handler=
        data=>{
            try{
                data=JSON.parse(data)
            }
            catch{
                console.log('error')
                return
            }
            
            if(this.clients.includes(data.id)){
                let id =data.id
                data=JSON.parse(data.data)
                Room.rooms.forEach((it)=>{

                    if(it.roomID==data.roomID){
                        it.players.push(id)
                        console.log(it.players)
                    }
                    //接下來實作一些回傳給房客的東西
                })
            }
            else console.log('error')
        }
    }
}