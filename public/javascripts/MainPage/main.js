let client = null
let nickname = null
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

    let createRoomDialog = new CreateRoomDialog()
    createRoomDialog.create()
    let settingDialog = new SettingDialog()
    settingDialog.create()
    let realLength
    $('#name').hide()
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
            
    }
    else {
        nickname = $('#name').text()
    }
    client = io()
    verify(nickname)
        .then((id) => {//成功之後
            if(localStorage.getItem('sortingWithColor')==null){
                localStorage.setItem('sortingWithColor',false)
            }
            else{
                $('#sortingWithColor').prop('checked',localStorage.getItem('sortingWithColor')==="true")
            }
            $('#password').text(nickname)
            let builder = new PacketBuilder(id)
            let ruleBuilder = new RuleBuilder()
            let joinRoomDialog = new JoinRoomDialog(builder)
            joinRoomDialog.create()
            initEvents()
            $('#settingButton').on('click',()=>{
                settingDialog.show();
            })
            $('#check').on('click', () => {
                let roomNumber = $('#roomNumber').val();
                localStorage.setItem('sortingWithColor',$('#sortingWithColor').is(':checked'))
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
            $('#sortingWithColor').change(()=>{
                localStorage.setItem('sortingWithColor',$('#sortingWithColor').is(':checked'))
            })
        })
        .catch(() => {
            alert("失敗")
        })
}