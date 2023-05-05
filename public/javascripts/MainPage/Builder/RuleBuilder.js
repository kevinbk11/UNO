class RuleBuilder
{
    constructor()
    {
        this.rule={throwMultipleCard:false,overlay:false}
    }
    setThrowMultipleCard(state){
        this.rule.throwMultipleCard=state
        return this
    }
    setOverlay(state){
        this.rule.overlay=state
        return this
    }
    build()
    {
        let res = this.rule
        return res
    }
}