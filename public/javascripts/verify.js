function verify(){
    const password = $('#password')
    const pass = password.text()
    password.text('')
    client.on('connect',(socket)=>{
        client.emit('VerifyRequest',pass)
    })
    let p = new Promise((resolve,reject)=>{
        client.on('VerifyResult',data=>{
            if(data!=false){
                password.text("已認證。")
                password.css('display','block')
                resolve(data['data'])
            }
            else{
                reject()
            }
        })
    })
    return p
}