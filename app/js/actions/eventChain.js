game.eventChain = {

	/**
	 * Play the current hand put down by both players. The hands are then 
	 * taken through the event chain, going in the order of precendence.
	 * 
	 * @param  {Object} oneCard One players Card
	 * @param  {Object} twoCard The other Players Card
	 */
	playCards: function(oneCard, twoCard){
		//This will be used to determine if the round has a winner
		game.global.turnWon = false; 

		//Go through the event Chain
		this.handleAttackCommands(oneCard, twoCard);
		this.handleNumberCards(oneCard, twoCard);
		this.handleDefenseCommands(oneCard, twoCard);
		this.handleAweCards(oneCard, twoCard);
		this.performAweDamage();
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
		var oneCardAttack = isCommand(oneCard, 'AttackCommand'); 
		var twoCardAttack = isCommand(twoCard, 'AttackCommand');
		
		if(oneCardAttack && twoCardAttack){
			//Both players played an attack command
			game.chainProperties.attackChain.bothAttack(oneCard, twoCard);
		}else if(oneCardAttack){
			//only oneCard played an Attack COmmand
			game.chainProperties.attackChain.singleAttack(oneCard);
		}else if(twoCardAttack){
			//Only twoCard played an Attack Command
			game.chainProperties.attackChain.singleAttack(oneCard);
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
		var oneCardNumber = isCommand(oneCard, 'RegularCommand');
		var twoCardNumber = isCommand(twoCard, 'RegularCommand');

		if(oneCardNumber && twoCardNumber){
			//Both Players played a number card
			game.chainProperties.numberChain.bothNumber(oneCard, twoCard);
		}else if(oneCardNumber){
			//Only oneCard played a number card
			game.chainProperties.numberChain.singleNumber(oneCard);
		}else if(twoCardNumber){
			//Only twoCard played a number card
			game.chainProperties.numberChain.singleNumber(twoCard);
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
		var oneCardDefense = isCommand(oneCard, 'DefenseCommand');
		var twoCardDefense = isCommand(twoCard, 'DefenseCommand');

		if(oneCardDefense && twoCardDefense){
			//Both Players played a Defence Card
			game.chainProperties.defenseChain.bothDefend(oneCard, twoCard);
		}else if(oneCardDefense){
			//Only oneCard played a defence card
			game.chainProperties.defenseChain.singleDefence(oneCard);
		}else if(twoCardDefense){
			//Only twoCard played a defence card
			game.chainProperties.defenseChain.singleDefence(twoCard);
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
		var oneCardAwe = isCommand(oneCard, 'AweCommand');
		var twoCardAwe = isCommand(twoCard, 'AweCommand');

		if(oneCardAwe && twoCardAwe){
			game.chainProperties.aweChain.bothAwe(oneCardAwe, twoCardAwe);
		} else if(oneCardAwe){
			game.chainProperties.aweChain.playAwe(oneCardAwe);
		} else if(twoCardAwe){
			game.chainProperties.aweChain.playAwe(twoCardAwe);
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