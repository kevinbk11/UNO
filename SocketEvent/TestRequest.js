module.exports=class TestRequest{
    constructor(){
        this.socket
        this.clients
        this.name="TestRequest"
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
            
            if(this.clients.includes(data.id))console.log('pass')
            else console.log('error')
        }
    }
}
