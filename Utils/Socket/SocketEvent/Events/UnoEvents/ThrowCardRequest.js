const Room = require("../../../../Game/Room");
const SocketEvent = require("../../SocketEvent");
const PacketBuilder = require('../../../../Builder/PacketBuilder');
const Game = require("../../../../Game/Game");
const Card = require("../../../../Game/Card/Card");
module.exports = class ThrowCardRequest extends SocketEvent{
    constructor(){
        super()
        this.name='ThrowCardRequest'
        this.handler=data=>{
            if(this.clients.includes(data.id)){
                data=data.data
                const cards = data.cards
                const game = Game.games[data.roomID]
                for(let i=0;i<cards.length;i++){
                    cards[i]=Card.buildCard(cards[i])
                }
                if(game.checkThrowIsValid(cards,data.name)){
                    this.socket.emit('ThrowCardRespondEvent',PacketBuilder
                    .addData('success',true)
                    .addData('removedCardNumber',data.choiced)
                    .build())
                    game.throw(cards)
                }
                for(let i=0;i<game.players.length;i++){
                    const player = game.players[i]
                    player.socket.emit('ChangeCardEvent',game.lastCard)
                }
            }
            
                

        }
    }
}