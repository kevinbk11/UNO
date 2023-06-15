class UnoDialog extends Dialog{
    static dialog = null
    constructor(){
        super(`
        <div id="unoDialog" class=dialog title="UNO!!">
            <p id=unoMessage style='font-size:28px;color:purple'></p>
        </div>`)
    }
    create(){
        if(UnoDialog.dialog!=null)return
        super.create()
        $('#unoDialog').dialog({
            width:300
            ,resizable:false
            ,draggable:true
            ,autoOpen:false
            ,show:{effect:'slide',direction:'left'}
            ,hide:{effect:'slide',direction:'right'}
            ,position:{
                my: "center",
                at: "center top+25%",
            }
        })
        UnoDialog.dialog=this
    }
    show(){
        $('#unoDialog').dialog('open');
        //$('#changeColorDialog').effect({effect:'slide',direction:'left',duration:1000})
    }
    hide(){
        //$('#changeColorDialog').effect({effect:'slide',duration:1000})
        $('#unoDialog').dialog('close');
    }
}