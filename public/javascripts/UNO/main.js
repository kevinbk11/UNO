let client = null
window.onload = ()=>{
    let choiceColorDialog = new ChangeColorDialog()
    let gameEndDialog = new GameEndDialog()
    gameEndDialog.create()
    choiceColorDialog.create()
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
        
        $('.color-button').on('click',(e)=>{
            client.emit('ChoiceColorRespond',builder
            .addData('color',$(e.target).attr('id'))
            .addData('roomID',roomID))
            choiceColorDialog.hide()
         })
         $('#unoButton').on('click',()=>{
            client.emit('UnoRequest',builder
            .addData('roomID',roomID)
            .addData('name',name)
            .build())
         })
    })
    
}