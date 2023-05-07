let client = null
window.onload = ()=>{
    client = io()
    const name = $('#name').text()
    const roomID = $(location).attr('href').split('/').pop()
    const handCards=[]
    verify(name)
    .then((id)=>{
        let builder = new PacketBuilder(id)        
        initEvents(name,roomID,handCards,builder)
        client.emit('InitGameRequest',builder
        .addData('name',name)
        .addData('roomID',roomID)
        .build())
    })
    
}