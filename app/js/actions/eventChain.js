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
		var _this = this;

		game.animations.showCards(oneCard, twoCard);

		//Go through the event Chain
		setTimeout(function() {
			_this.handleAttackCommands(oneCard, twoCard);
			_this.handleNumberCards(oneCard, twoCard);
			_this.handleDefenseCommands(oneCard, twoCard);
			_this.handleAweCards(oneCard, twoCard);
			_this.performAweDamage();
		}, 4000);
		
	},

	/**
	 * See if the cards have any neccessary actions in the Attack Commands.
	 * If either player plas an attack command, they will be passed to the attack
	 * Chain.
	 * 
	 * @param  {Object} oneCard One Players Card
	 * @param  {Object} twoCard The other Players Card
	 */
	handleAttackCommands: function(oneCard, twoCard){
		//Check if either cards is an "Attack Command" card
		var oneCardAttack = this.isCommand(oneCard, game.AttackCommand); 
		var twoCardAttack = this.isCommand(twoCard, game.AttackCommand);
		
		if(oneCardAttack && twoCardAttack){
			//Both players played an attack command
			game.chainProperties.attackChain.bothAttack(oneCard, twoCard);
		}else if(oneCardAttack){
			//only oneCard played an Attack COmmand
			game.chainProperties.attackChain.singleAttack(oneCard, twoCard);
		}else if(twoCardAttack){
			//Only twoCard played an Attack Command
			game.chainProperties.attackChain.singleAttack(twoCard, oneCard);
		}
	},

	/**
	 * See if the cards have any actions in the number (or regular) commands.
	 * If either player plays a number command, they will be passed to the number
	 * chain.
	 * 
	 * @param  {Object} oneCard One Players Card
	 * @param  {Object} twoCard The other Players Card
	 */
	handleNumberCards: function(oneCard, twoCard){
		//Check if either cards is a number card
		var oneCardNumber = this.isCommand(oneCard, game.RegularCommand);
		var twoCardNumber = this.isCommand(twoCard, game.RegularCommand);

		if(oneCardNumber && twoCardNumber){
			//Both Players played a number card
			game.chainProperties.numberChain.bothNumber(oneCard, twoCard);
		}else if(oneCardNumber){
			//Only oneCard played a number card
			game.chainProperties.numberChain.singleNumber(oneCard, twoCard);
		}else if(twoCardNumber){
			//Only twoCard played a number card
			game.chainProperties.numberChain.singleNumber(twoCard, oneCard);
		}
	},

	/**
	 * See if the cards have any actions are defence commands.
	 * If either player plays a defence command, they will be passed to the 
	 * defence chain.
	 * 
	 * @param  {Object} oneCard One Players Card
	 * @param  {Object} twoCard The other Players Card
	 */
	handleDefenseCommands: function(oneCard, twoCard){
		//Check if either card is a defence command
		var oneCardDefense = this.isCommand(oneCard, game.DefenceCommand);
		var twoCardDefense = this.isCommand(twoCard, game.DefenceCommand);

		if(oneCardDefense && twoCardDefense){
			//Both Players played a Defence Card
			game.chainProperties.defenseChain.bothDefend(oneCard, twoCard);
		}else if(oneCardDefense){
			//Only oneCard played a defence card
			game.chainProperties.defenseChain.singleDefence(oneCard, twoCard);
		}else if(twoCardDefense){
			//Only twoCard played a defence card
			game.chainProperties.defenseChain.singleDefence(twoCard, oneCard);
		}
	},

	/**
	 * See if the cards played are a 'awe command'. If either
	 * palyer plays an awe command, they will be passed to the 
	 * awe chain.
	 * 
	 * @param  {Object} oneCard One Players Card
	 * @param  {Object} twoCard The other Players Card
	 */
	handleAweCards: function(oneCard, twoCard){
		//Check if either card is an 'awe command'.
		var oneCardAwe = this.isCommand(oneCard, game.AweCommand);
		var twoCardAwe = this.isCommand(twoCard, game.AweCommand);

		if(oneCardAwe && twoCardAwe){
			game.chainProperties.aweChain.bothAwe(oneCard, twoCard);
		} else if(oneCardAwe){
			game.chainProperties.aweChain.playAwe(oneCard, twoCard);
		} else if(twoCardAwe){
			game.chainProperties.aweChain.playAwe(twoCard, oneCard);
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
}