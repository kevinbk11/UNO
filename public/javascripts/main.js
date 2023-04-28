let client = io()

window.onload= ()=>{
    verify()
    .then((id)=>{//成功之後
        let builder = new PacketBuilder(id)
        $('#testbtn').on('click',()=>{
            client.emit('test',builder.addData('hi').build())
            alert("已送出")}
        )
    })
    .catch(()=>{
        alert("失敗")
    })
    
}