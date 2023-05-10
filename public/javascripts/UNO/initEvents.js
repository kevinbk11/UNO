function initEvents(name,roomID,handCards,packetBuilder){
    SocketEvent.events.forEach(it=>{
        client.on(it.name,it.handler)
        it.userName=name
        it.roomID=roomID
        it.packetBuilder=packetBuilder
        it.handCards=handCards
    })
}