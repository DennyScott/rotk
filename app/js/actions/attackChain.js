game.chainProperties.attackChain = {
	
	/**
	 * Chain of precendence in Attack Command
	 */
	attackCommandOrder: {
		taunt: 4,
		incite: 3,
		argue: 2,
		fault: 1
	},

	/**
	 * Both Players have Used Attack Commands. Compare both the cards, and see which card
	 * has a higher precendence. The higher precendence will win the attack. The winner of the attack
	 * attempts to perform an attack, handles in performAttackCommand. If both are the
	 * same they negate each other.
	 * 
	 * @param  {Object} oneCard An Attack Command Card
	 * @param  {Object} twoCard An Attack Command Card
	 */
	bothAttack: function(oneCard, twoCard) {
		//If oneCard has a higher precedent, it wins.
		if(this.attackCommandOrder[oneCard.value.toLowerCase()] > this.attackCommandOrder[twoCard.value.toLowerCase()]){
			this.performAttackCommand(oneCard)
		}
		//If twoCard has a higher precendent, it wins
		else if(this.attackCommandOrder[oneCard.value.toLowerCase()] < this.attackCommandOrder[twoCard.value.toLowerCase()]){
			this.performAttackCommand(twoCard);
		}else{
			//Cancel Animation, negate both players attack
		}

		game.global.turnWon = true; //State that the turn has been won
	},

	/**
	 * Only a Single Player issued an Attack Command. Attempt to use the
	 * attack command with the perform Attack Command.
	 * 
	 * @param  {Object} oneCard An Attack Command Card
	 */
	singleAttack: function(oneCard) {
		this.performAttackCommand(oneCard);
		game.global.turnWon = true;
	},

	/**
	 * Attempt to perform the attack command of an attack command card.
	 * If the opponent is currently holding onto a defense card, the attack
	 * will be either negated or countered, depending on the defence command
	 * card.
	 * 
	 * @param  {Object} card An attack command card.
	 */
	performAttackCommand: function(card) {
		//Does the opponent hold a defence card
		if(card.owner.opponent.isHoldingDefenceCard()){
			//Cancel Animation
			card.owner.opponent.useDefenseCard();
		}else{
			console.log('performing attack command');
			console.log(card);
			card.combatAction(); //Peform Attack Command
		}
	}

}