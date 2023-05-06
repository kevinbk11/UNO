function initEvents(name,roomID,packetBuilder){
    let handCards = []
    SocketEvent.events.forEach(it=>{
        client.on(it.name,it.handler)
        it.userName=name
        it.roomID=roomID
        it.packetBuilder=packetBuilder
        it.handCards=handCards
    })
}