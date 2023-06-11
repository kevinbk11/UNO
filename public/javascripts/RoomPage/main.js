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
            if($('#name1').val()!=nickname){
                $('#gameStartButton').remove()
            }
            else{
                $('#gameStartButton').on('click', () => {
                    let roomID = $('#roomID').val()
                    client.emit('StartGameRequest', builder
                        .addData('name', nickname)
                        .addData('roomID', roomID)
                        .build())
                })
            }

        })
        .catch(() => {
            alert("失敗")
        })
}