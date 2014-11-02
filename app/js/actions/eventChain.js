var game = window.game || {};

game.eventChain = {

	/**
	 * Play the current hand put down by both players. The hands are then 
	 * taken through the event chain, going in the order of precendence.
	 * 
	 * @param  {Object} oneCard One players Card
	 * @param  {Object} twoCard The other Players Card
	 */
	playCards: function(oneCard, twoCard, changeTurn, context){
		//This will be used to determine if the round has a winner
		game.global.turnWon = false; 
		game.global.round.isTie = false;
		game.global.round.changeTurn = changeTurn;
		game.global.round.context = context;
		this.oneCard = oneCard;
		this.twoCard = twoCard;
		var _this = this;

		game.animations.showCards(oneCard, twoCard);

		//Go through the event Chain
		setTimeout(function() {
			_this.handleCommand(game.AttackCommand, game.chainProperties.attackChain);
			_this.handleCommand(game.RegularCommand, game.chainProperties.numberChain);
			_this.handleCommand(game.DefenceCommand, game.chainProperties.defenceChain);
			_this.handleCommand(game.AweCommand, game.chainProperties.aweChain);
			_this.performAweDamage();
		}, 4000);
		
	},

	handleCommand: function(command, chainProperty){
		var oneCardCommand = this.isCommand(this.oneCard, command);
		var twoCardCommand =this.isCommand(this.twoCard, command);

		if(oneCardCommand && twoCardCommand){
			chainProperty.both(this.oneCard, this.twoCard);
		}else if(oneCardCommand){
			chainProperty.single(this.oneCard, this.twoCard);
		}else if(twoCardCommand){
			chainProperty.single(this.twoCard, this.oneCard);
		}
	},

	/**
	 * At the end of each turn, awe damage is accumulated.
	 */
	performAweDamage: function(){
		game.chainProperties.aweChain.handleAwe();
	},

	/**
	 * Check if passed card is of a command type.
	 * 
	 * @param  {Object}  card Card to check type of
	 * @param  {Object}  type Comparator of type.
	 * @return {Boolean}      Is of type.
	 */
	isCommand: function(card, type) {
		if(card instanceof type){
			return true;
		}
		return false;
	},
};