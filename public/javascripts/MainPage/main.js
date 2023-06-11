let client = null
function countContainChinese(str){
    let length=0
    for(let i=0;i<str.length;i++){
        if(str[i].charCodeAt()>255){
            length+=2
        }else{
            length+=1
        }
    }
    return length
}
window.onload = () => {
    let joinRoomDialog = new JoinRoomDialog()
    joinRoomDialog.create()
    let createRoomDialog = new CreateRoomDialog()
    createRoomDialog.create()
    let nickname
    let realLength
    if ($('#name').text() == "") {
        nickname = prompt('請輸入您的暱稱。')
        realLength=countContainChinese(nickname)
        while (nickname == null || nickname == '' || realLength>10){
            if(realLength>=10){
                nickname = prompt('名稱太長了，最多只能在十個字元以下(中文字一個字兩個佔字元)。')
                realLength=countContainChinese(nickname)
            }
            else nickname = prompt('暱稱不可為空!請輸入您的暱稱。')

        }
            
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