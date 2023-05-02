let client = null
let joinRoomDialog = new JoinRoomDialog()

window.onload= ()=>{
    joinRoomDialog.create()
    let nickname = prompt('請輸入您的暱稱。')
    while(nickname==null || nickname=='')
        nickname=prompt('暱稱不可為空!請輸入您的暱稱。')

    client=io()
    verify(nickname)
    .then((id)=>{//成功之後
        $('#password').text(nickname)
        Dialog.id=id;
        let builder = new PacketBuilder(id)
        let ruleBuilder = new RuleBuilder()
        
        initEvents()
        
        $('#check').on('click',()=>{
            let roomNumber = $('#roomNumber').val();
            client.emit('JoinRoomRequest',builder.addData('name',nickname).addData('roomID',roomNumber).build())
        })
        
        $('#createRoomButton').on('click',()=>{
            let rule =ruleBuilder.build()
            client.emit('CreateRoomRequest',builder.addData('name',nickname).addData('rule',rule).build())
            $('.RoomButton').hide()
            $('#gameStartButton').css('display','block')
            $('#users').append(`1.${nickname}`)
        })
        $('#joinRoomButton').on('click',()=>{
            joinRoomDialog.show()
        })
        $('#gameStartButton').on('click',()=>{
            let roomID = $('#roomID').text().split(':')[1]
            client.emit('StartGameRequest',builder.addData('name',nickname).addData('roomID',roomID).build())
            $('#gameStartButton').hide()
        })

    })
    .catch(()=>{
        alert("失敗")
    })
    
}