class RuleBuilder {
    constructor() {
        this.rule = { isAllowThrowMultipleCard: false, isAllowStacking: false, isAllowPass: false, isMustThrowCard: false }
    }
    setAllowThrowMultipleCard(state) {
        this.rule.isAllowThrowMultipleCard = state
        return this
    }
    setAllowStacking(state) {
        this.rule.isAllowStacking = state
        return this
    }
    setAllowPass(state) {
        this.rule.isAllowPass = state
        return this
    }
    setMustThrowCard(state) {
        this.rule.isMustThrowCard = state
        return this
    }
    build() {
        let res = this.rule
        return res
    }
}