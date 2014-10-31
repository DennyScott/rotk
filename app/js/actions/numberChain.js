game.chainProperties.numberChain = {

	/**
	 * Both Players places a number card down. We now have to check which
	 * number will win. Depending on the arrow direction, the lower or higher number
	 * will win.
	 * 
	 * @param  {Object} oneCard A Number Card
	 * @param  {Object} twoCard A Number Card
	 */
	bothNumber: function(oneCard, twoCard) {
		//Get Comparotor method. This is dependent on the current
		//direction of the arrow.
		var comparator = global.arrow.isUp()?isGreater:isLessThan;
		var result = comparator(oneCard.value, twoCard.value); //Get winning value

		//One Card wins, and gets to damage the opponent
		 if(result = 1){
		 	this.damageOpponent(oneCard);
			this.playCard([oneCard, twoCard]);
		 }
		 //Two Card Wins, and gets to damage the opponent
		 else if(result = -1){
		 	this.damageOpponent(twoCard);
			this.playCard([twoCard, oneCard]);
		 }
		 //Both Numbers were the same, neither are placed.
		 else{
		 	//Cancel out animation
		 }
	},

	/**
	 * Check if the first value is greater then the second. If it is
	 * return a 1, if the second value is greater, then a -1, if they are
	 * equal, return a 0
	 * 
	 * @param  {Object}  oneCard A Number Card
	 * @param  {Object}  twoCard A Number Card
	 * @return {int}     Value representing the greater item
	 */
	isGreater: function(oneCard, twoCard){
		if(oneCard.value > twoCard.value){
			return 1;
		}else if(oneCard.value < twoCard.value){
			return -1;
		}else{
			return 0;
		}
	},

	/**
	 * Check if the first value is less than the second. If it is, return a 1,
	 * if the second value is less, then a -1. If they are equal, return a 0.
	 * 
	 * @param  {Object}  oneCard A Number Card
	 * @param  {Object}  twoCard A Number Card
	 * @return {int}     Value representing the lesser item.
	 */
	isLessThan: function(oneCard, twoCard){
		if(oneCard.value < twoCard.value){
			return 1;
		}else if(oneCard.value > twoCard.value){
			return -1;
		}else{
			return 0;
		}
	},

	/**
	 * Play a single Number. If no one has one, damage the other player
	 * with the card play.
	 * 
	 * @param  {Object} card A Number Card
	 */
	singleNumber: function(card) {
		if (!game.global.turnWon) {
			this.damageOpponent(card);
		}

		this.playCard([card]);

	},

	/**
	 * Play a Card on the baord. Once the card has been placed on the board, check
	 * if a combo has been created.
	 * 
	 * @param  {Array} cards Cards in the winning order
	 */
	playCard: function(cards) {
		//Cycle through cards, and play the card on the number position
		for (var i = 0; i < cards.length; i++) {
			var combo = game.global.currentBoard.playNumberCard(cards[i].value, cards[i].color);
			this.checkCombo(combo, cards[i]); //Check if there is a combo after playing card
		}
	},

	/**
	 * Check if their is a combo after the last play. This combo can be either a winning
	 * combo, or a losing combo. If there is a combo, handle the combo.
	 * 
	 * @param  {Object} combo Returned object from board, telling us if their is a combo
	 * @param  {Object} card  Card played that could have created a combo
	 */
	checkCombo: function(combo, card) {
		//Handle Winning Combos
		if (combo.win.length > 0) {
			this.handleCombo(combo.win, card.owner.heal, card.owner.opponent.takeDamage);
		}

		//Handle Losing Combos
		if (combo.lose.length > 0) {
			this.handleCombo(combo.lose, card.owner.takeDamage, card.owner.opponent.heal);
		}
	},

	/**
	 * Handle a Combo. This is a generic method, that will handle both winning and 
	 * losing combos. The effects that are done to players are injected into the function.
	 * 
	 * @param  {Array} combo                Array of Found Combos
	 * @param  {Function} currentPlayerEffect  Function to perform on player who played card
	 * @param  {[Function]} opposingPlayerEffect Function to perform on opponent
	 */
	handleCombo: function(combo, currentPlayerEffect, opposingPlayerEffect) {
		for (var i = 0; i < combo.length; i++) {
			game.global.currentBoard.clearCombo(combo[i]); //Clear the cards from the board used in combo.
			currentPlayerEffect(game.gloabl.comboValue); //Perform action on card holding player
			opposingPlayerEffect(game.global.comboValue); //Perform action on opponent
			game.global.arrow.flip(); //Flip the arrow
		}
	},

	/**
	 * Damage the opponent of the player that used this card. Afterwards, state that
	 * someone has won this round. 
	 * 
	 * @param  {Object} card Number Card Played
	 */
	damageOpponent: function(card) {
		card.owner.opponent.takeDamage(game.global.turnDamage);
		game.global.turnWon = true;
	}
}