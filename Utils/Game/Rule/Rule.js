const CARD_TYPE = require("../Card/CARD_TYPE");
const AllowMultipleThrow = require("./RuleStrategy/MultipleThrow/AllowMultipleThrow");
const AllowStacking = require("./RuleStrategy/Stacking/AllowStacking");
const NoMultipleThrow = require("./RuleStrategy/MultipleThrow/NoMultipleThrow");
const NoStacking = require("./RuleStrategy/Stacking/NoStacking");
const NoPass = require("./RuleStrategy/Pass/NoPass");
const AllowPass = require("./RuleStrategy/Pass/AllowPass");
const MustThrowCard = require("./RuleStrategy/MustThrowCard/MustThrowCard");
const NotMustThrowCard = require("./RuleStrategy/MustThrowCard/NotMustThrowCard");
module.exports=class Rule{
    constructor(){
        this.isAllowThrowMultipleCard;
        this.isAllowStacking;
        this.isAllowPass;
        this.isMustThrowCard;

        this.throwMultipleCardStrategy;
        this.stackingStrategy;
        this.passStrategy;
        this.mustThrowCardStrategy;
    }
    static buildRule(data){
        let newRule = new this()
        newRule.isAllowThrowMultipleCard=data.isAllowThrowMultipleCard
        newRule.isAllowStacking=data.isAllowStacking
        newRule.isAllowPass=data.isAllowPass
        newRule.isMustThrowCard=data.isMustThrowCard
        newRule.setStrategy()
        return newRule
    }
    setStrategy(){
        this.throwMultipleCardStrategy= this.isAllowThrowMultipleCard ? new AllowMultipleThrow() : new NoMultipleThrow() 
        this.stackingStrategy= this.isAllowStacking ? new AllowStacking() : new NoStacking()
        this.passStrategy = this.isAllowPass ? new AllowPass() : new NoPass()
        this.mustThrowCardStrategy = this.isMustThrowCard ? new MustThrowCard() : new NotMustThrowCard()
    }
    executeMultipleCardStrategy(game,cards){
        return this.throwMultipleCardStrategy.execute(game,cards)
    }
    executeStackingStrategy(game,playerNumber,droppedCards){
        return this.stackingStrategy.execute(game,playerNumber,droppedCards)
    }
    executePassStrategy(game,player){
        this.passStrategy.execute(game,player)
    }
    executeMustThrowCard(game,player,newCard){
        this.mustThrowCardStrategy.execute(game,player,newCard)
    }
}