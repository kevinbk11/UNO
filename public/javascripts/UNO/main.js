let client = null
window.onload = ()=>{
    client = io()
    client.on('connect',(socket)=>{
        initEvents()
        const roomID = $(location).attr('href').split('/').pop()
        client.emit('InitGameRequest',PacketBuilder.addData('name',$('#name').text()).addData('roomID',roomID).build())
        
    })
    
}