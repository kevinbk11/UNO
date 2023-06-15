function verify(nickname){
    const password = $('#password')
    const pass = password.text()
    password.text('')
    client.on('connect',(socket)=>{
        client.emit('VerifyRequest',{'password':pass,'name':nickname})
    })
    let p = new Promise((resolve,reject)=>{
        client.on('VerifyRespond',data=>{
            if(data=='repeat'){
                alert("該名字目前已有使用者使用。")
                location.reload()
                reject()
            }
            else if(data!=false){
                password.text("已認證。")
                password.css('display','none')
                resolve(data['data'])
            }
            else{
                reject()
            }
        })
    })
    return p
}