let client = io()


window.onload= ()=>{
    verify()
    .then((id)=>{//成功之後
        let builder = new PacketBuilder(id)
        let ruleBuilder = new RuleBuilder()
        $('#createRoomButton').on('click',()=>{
            let rule =ruleBuilder.build()
            client.emit('CreateRoomRequest',builder.addData('rule',rule).build())
            $('.RoomButton').css('display','none')
            $('#gameStartButton').css('display','block')
        })
        /*
        實作開始遊戲的按鈕的發送請求
        */ 

    })
    .catch(()=>{
        alert("失敗")
    })
    
}