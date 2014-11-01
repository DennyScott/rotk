game.chainProperties.defenseChain = {

	/**
	 * Both players played a defense card. If they both play a defence card,
	 * the cards are cancelled out.
	 * 
	 * @param  {Object} oneCard One Players Defence Command Card
	 * @param  {Object} twoCard Another Players Defence Command Card
	 */
	bothDefend: function(oneCard, twoCard) {
		//Do Nothing, probably want an animation here
		
		game.global.turnWon = true; //End the turn
	},

	/**
	 * Only one player played a defence card. Perform its combat action.
	 * 
	 * @param  {Object} oneCard A defence command card.
	 */
	singleDefence: function(oneCard){
		if(!game.global.turnWon){
			oneCard.combatAction();
		}
		
	}
}