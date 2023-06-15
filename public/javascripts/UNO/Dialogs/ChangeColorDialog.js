class ChangeColorDialog extends Dialog{
    static dialog = null
    constructor(){
        super(`
        <div id="changeColorDialog" class=dialog title="選擇顏色">
            <p style="font-size:24px">請選擇你想變更的顏色</p>
            <input id=green value='綠色' class="ui-button color-button" style="width:40px";>
            <input id=blue value='藍色' class="ui-button color-button" style="width:40px";>
            <input id=yellow value='黃色'class="ui-button color-button" style="width:40px";>
            <input id=red value='紅色'class="ui-button color-button" style="width:40px";>
        </div>`)
    }
    create(){
        if(ChangeColorDialog.dialog!=null)return
        super.create()
        $('#changeColorDialog').dialog({
            width:400
            ,resizable:false
            ,draggable:true
            ,autoOpen:false
            ,show:{effect:'slide',direction:'left'}
            ,hide:{effect:'slide',direction:'right'}});
        $('#changeColorDialog .ui-dialog-titlebar-close').css('display','none')
        ChangeColorDialog.dialog=this
        
    }
    show(){
        $('#changeColorDialog').dialog('open');
        //$('#changeColorDialog').effect({effect:'slide',direction:'left',duration:1000})
    }
    hide(){
        //$('#changeColorDialog').effect({effect:'slide',duration:1000})
        $('#changeColorDialog').dialog('close');
        
        
    }
}