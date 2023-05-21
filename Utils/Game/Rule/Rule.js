const CARD_TYPE = require("../Card/CARD_TYPE");
const AllowMultipleThrow = require("./RuleStrategy/MultipleThrow/AllowMultipleThrow");
const AllowStacking = require("./RuleStrategy/Stacking/AllowStacking");
const NoMultipleThrow = require("./RuleStrategy/MultipleThrow/NoMultipleThrow");
const NoStacking = require("./RuleStrategy/Stacking/NoStacking");
const NoPass = require("./RuleStrategy/Pass/NoPass");
const AllowPass = require("./RuleStrategy/Pass/AllowPass");
module.exports=class Rule{
    constructor(){
        this.isAllowThrowMultipleCard;
        this.isAllowStacking;
        this.isAllowPass;
        this.throwMultipleCardStrategy;
        this.stackingStrategy;
        this.passStrategy;
    }
    static buildRule(data){
        let newRule = new this()
        newRule.isAllowThrowMultipleCard=data.isAllowThrowMultipleCard
        newRule.isAllowStacking=data.isAllowStacking
        newRule.isAllowPass=data.isAllowPass
        newRule.setStrategy()
        return newRule
    }
    setStrategy(){
        this.throwMultipleCardStrategy= this.isAllowThrowMultipleCard ? new AllowMultipleThrow() : new NoMultipleThrow() 
        this.stackingStrategy= this.isAllowStacking ? new AllowStacking() : new NoStacking()
        this.passStrategy = this.isAllowPass ? new AllowPass() : new NoPass()
    }
    executeMultipleCardStrategy(game,cards){
        return this.throwMultipleCardStrategy.execute(game,cards)
    }
    executeStackingStrategy(game,playerNumber,droppedCards){
        return this.stackingStrategy.execute(game,playerNumber,droppedCards)
    }
    executePassStrategy(game,player){
        return this.passStrategy.execute(game,player)
    }
}