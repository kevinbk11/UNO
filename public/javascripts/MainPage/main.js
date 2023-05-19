let client = null
window.onload= ()=>{
    let joinRoomDialog = new JoinRoomDialog()
    joinRoomDialog.create()
    let nickname = prompt('請輸入您的暱稱。')
    while(nickname==null || nickname=='')
        nickname=prompt('暱稱不可為空!請輸入您的暱稱。')

    client=io()
    verify(nickname)
    .then((id)=>{//成功之後
        $('#password').text(nickname)
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
            $('#content').append(`1.${nickname}<br>`)
        })
        $('#joinRoomButton').on('click',()=>{
            joinRoomDialog.show()
        })
        $('#gameStartButton').on('click',()=>{
            let roomID = $('#roomID').text().split(':')[1]
            let ruleBuilder = new RuleBuilder()
            let rule=ruleBuilder.setAllowThrowMultipleCard(true).setAllowStacking(true).build()
            client.emit('StartGameRequest',builder.addData('name',nickname).addData('roomID',roomID).addData('rule',rule).build())
            $('#gameStartButton').hide()
        })
    })
    .catch(()=>{
        alert("失敗")
    })
    
}