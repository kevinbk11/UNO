class SettingDialog extends Dialog{
    static dialog = null
    constructor(){
        super(`
        <div id="settingDialog" class=dialog title="設定" style="overflow-y: auto;max-height: 1px;">

            <label for="sortingWithColor">
            <input type="checkbox" class="checkbox" id="sortingWithColor">
                卡牌依照顏色排序(未勾選為照數字排序)
            </label>
            <div style='
            display:flex;
            flex-direction: row;
            justify-content: center;
            align-items: center;
            border-style:solid;
            border-width:1px;
            border-color:#D3D3D3';
            >
                <p style='margin:0px 10px 0px 0px;'>聲音大小</p>
                <div id="soundBar" style='margin:0px 10px 0px 0px;'></div>
                測試音量
                <img src='../../../../images/icons/TestSoundicon.png' style='width:20' id='testVolumn'>

            </div>


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
        const volume = localStorage.getItem('volume')==null? 50: localStorage.getItem('volume')
        localStorage.setItem('volume',volume)
        $('#soundBar').slider({
            value:volume,
            min:0,
            max:100,
            step:1
        })
        $('#testVolumn').on('click',()=>{
            AudioPlayer.playDrawCardEffect()
        })
        $('#soundBar').css('width',180)
        $('#soundBar').on('slidechange',(event,ui)=>{
            localStorage.setItem('volume',ui.value)
        })
        SettingDialog.dialog=this
    }
    show(){
        $('#settingDialog').dialog('open');
    }
    hide(){
        $('#settingDialog').dialog('close');
    }
}