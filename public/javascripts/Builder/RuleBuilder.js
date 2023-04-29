class RuleBuilder
{
    constructor()
    {
        this.rule={throwMultipleCard:false,overlay:false}
    }
    setThrowMultipleCard(state){
        this.rule.throwMultipleCard=state
    }
    setOverlay(state){
        this.rule.overlay=state
    }
    build()
    {
        let res = JSON.stringify(this.rule)
        this.data={}
        return res
    }
}