let client = null
window.onload = () => {
    let joinRoomDialog = new JoinRoomDialog()
    joinRoomDialog.create()
    let createRoomDialog = new CreateRoomDialog()
    createRoomDialog.create()
    let nickname
    if ($('#name').text() == "") {
        nickname = prompt('請輸入您的暱稱。')
        while (nickname == null || nickname == '')
            nickname = prompt('暱稱不可為空!請輸入您的暱稱。')
        $('#name').text(nickname)
    }
    else {
        nickname = $('#name').text()
    }
    client = io()
    verify(nickname)
        .then((id) => {//成功之後
            $('#password').text(nickname)
            let builder = new PacketBuilder(id)
            let ruleBuilder = new RuleBuilder()

            initEvents()

            $('#check').on('click', () => {
                let roomNumber = $('#roomNumber').val();
                client.emit('JoinRoomRequest', builder.addData('name', nickname).addData('roomID', roomNumber).build())
            })

            $('#createRoomButton').on('click', () => {
                createRoomDialog.show()
            })  
            $('#createRoomSubmit').on('click',()=>{
                let ruleBuilder = new RuleBuilder()
                let rule = ruleBuilder
                    .setAllowThrowMultipleCard($("#checkbox_1").is(":checked"))
                    .setMustThrowCard($("#checkbox_2").is(":checked"))
                    .setAllowStacking($("#checkbox_3").is(":checked"))
                    .setAllowPass($("#checkbox_4").is(":checked"))
                    .build()
                client.emit('CreateRoomRequest', builder.addData('name', nickname).addData('rule', rule).build())
                $('#gameStartButton').show()
            })
            $('#joinRoomButton').on('click', () => {
                joinRoomDialog.show()
                client.emit("GetAllRoomRequest",builder.build())
            })
            $('#gameStartButton').on('click', () => {
                let roomID = $('#roomID').text().split(':')[1]
                let rule = ruleBuilder
                    .setAllowThrowMultipleCard($("#checkbox_1").is(":checked"))
                    .setAllowStacking($("#checkbox_2").is(":checked"))
                    .setAllowPass($("#checkbox_3").is(":checked"))
                    .setMustThrowCard($("#checkbox_4").is(":checked"))
                    .build()
                client.emit('StartGameRequest', builder
                    .addData('name', nickname)
                    .addData('roomID', roomID)
                    .addData('rule', rule).build())
                $('#gameStartButton').hide()
            })
        })
        .catch(() => {
            alert("失敗")
        })
}