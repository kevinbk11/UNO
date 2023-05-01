let client = null


window.onload= ()=>{
    client=io()
    verify()
    .then((id)=>{//成功之後
        Dialog.id=id;
        //$('#password').css('display','none')

        let builder = new PacketBuilder(id)
        let ruleBuilder = new RuleBuilder()
        let joinGameDialog = new JoinGameDialog()
        
        initEvents()
        joinGameDialog.create()

        $('#check').on('click',()=>{
            let roomNumber = $('#roomNumber').val();
            client.emit('JoinRoomRequest',builder.addData('roomID',roomNumber).build())
        })
        
        $('#createRoomButton').on('click',()=>{
            let rule =ruleBuilder.build()
            client.emit('CreateRoomRequest',builder.addData('rule',rule).build())
            $('.RoomButton').css('display','none')
            $('#gameStartButton').css('display','block')
            $('#users').append(`1.${id}`)
        })
        $('#joinRoomButton').on('click',()=>{
            joinGameDialog.show()
        })

    })
    .catch(()=>{
        alert("失敗")
    })
    
}