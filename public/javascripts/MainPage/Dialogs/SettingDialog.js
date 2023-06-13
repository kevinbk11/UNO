class SettingDialog extends Dialog{
    static dialog = null
    constructor(){
        super(`
        <div id="settingDialog" class=dialog title="設定" style="overflow-y: auto;max-height: 1px;">

            <label for="sortingWithColor">
            <input type="checkbox" class="checkbox" id="sortingWithColor">
                卡牌依照顏色排序(未勾選為照數字排序)
            </label>

        </div>`)

    }
    create(){
        if(SettingDialog.dialog!=null)return
        super.create()
        $('#settingDialog').dialog({
            width:400
            ,height:400
            ,resizable:false
            ,draggable:true
            ,autoOpen:false
            ,show:{effect:'drop'}
            ,hide:{effect:'explode'}
        });
        SettingDialog.dialog=this
    }
    show(){
        $('#settingDialog').dialog('open');
    }
    hide(){
        $('#settingDialog').dialog('close');
    }
}