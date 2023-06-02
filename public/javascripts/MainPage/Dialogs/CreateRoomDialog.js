class CreateRoomDialog extends Dialog{
    static dialog = null
    constructor(){
        super(`
        <div id="CreateRoomDialog" class=dialog title="創建房間">
            <p>輸入房名:<input id="roomName" style="margin:0px 0px 10px 0px"></p>
            
            <label for="checkbox_1">
                <input type="checkbox" class="checkbox" id="checkbox_1" value="isAllowThrowMultipleCard">
                允許出同數字多張牌<br>(在和檯面上卡片數字一樣的情況)
            </label>
            
            <br>

            <label for="checkbox_2">
                <input type="checkbox" class="checkbox" id="checkbox_2" value="isMustThrowCard">
                抽到有牌為止
            </label>
            <br>
            
            <label for="checkbox_3">
                <input type="checkbox" class="checkbox" id="checkbox_3" value="isAllowStacking">
                +2和+4可以疊加
            </label>
            <br>

            <label for="checkbox_4">
                <input type="checkbox" class="checkbox" id="checkbox_4" value="isAllowPass">
                可以抽一張牌Pass
            </label>
            <input type="button" id="createRoomSubmit" value="確定">
            
        </div>`)
    }
    create(){
        if(CreateRoomDialog.dialog!=null)return
        super.create()
        $('#CreateRoomDialog').dialog({
            width:400
            ,resizable:false
            ,draggable:true
            ,autoOpen:false
            ,show:{effect:'slide',direction:'left'}
            ,hide:{effect:'slide',direction:'right'}
        });
        CreateRoomDialog.dialog=this
    }
    show(){
        $('#CreateRoomDialog').dialog('open');
    }
    hide(){
        $('#CreateRoomDialog').dialog('close');
    }
}