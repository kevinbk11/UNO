module.exports=class JoinRoomRequest{
    constructor(){
        this.socket
        this.clients
        this.name="JoinRoomRequest"
        this.handler=
        data=>{
            console.log(typeof(data))
            try{
                data=JSON.parse(data)
            }
            catch{
                console.log('error')
                return
            }
            
            if(this.clients.includes(data.id)){
                
            }
            else console.log('error')
        }
    }
}