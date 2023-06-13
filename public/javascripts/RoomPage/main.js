let client = null
window.onload = () => {
    nickname = $('#name').text()
    client = io()
    verify(nickname)
        .then((id) => {//成功之後
            $('#password').remove() 
            $('#name').remove() 
            let builder = new PacketBuilder(id)
            initEvents()
            if($('.name1').text()!=nickname){
                $('#gameStartButton').remove()
            }
            else{
                $('#gameStartButton').on('click', () => {
                    let roomID = $('#roomID').text()
                    client.emit('StartGameRequest', builder
                        .addData('name', nickname)
                        .addData('roomID', roomID)
                        .build())
                })
            }
            $('#exitButton').on('click',()=>{
                client.emit('ExitRequest',builder
                .addData('name',nickname)
                .addData('roomID',$('#roomID').text())
                .build())
                postRedirect('/',{name:nickname})
            })

        })
        .catch(() => {
            alert("失敗")
        })
}