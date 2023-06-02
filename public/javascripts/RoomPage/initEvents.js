function initEvents(){
    SocketEvent.events.forEach(it=>{
        client.on(it.name,it.handler)
    })
}