game.chainProperties.attackChain = {
	attackCommandOrder: {
		taunt: 4,
		incite: 3,
		argue: 2,
		fault: 1
	},

	bothAttack: function(oneCard, twoCard) {
		if(attackCommandOrder[oneCard.value.toLowerCase()] > attackCommandOrder[twoCard.value.toLowerCase()]){
			oneCard.combatAction();
		}else if(attackCommandOrder[oneCard.value.toLowerCase()] > attackCommandOrder[twoCard.value.toLowerCase()]){
			twoCard.combatAction();
		}else{
			//Cancel Animation
		}

		game.global.turnWon = true;
	},

	singleAttack: function(oneCard) {
		oneCard.combatAction();
		game.global.turnWon = true;
	},

	performAttackCommand: function(card) {

		if(card.owner.opponent.isHoldingDefenceCard){
			//Cancel Animation
			card.owner.opponent.removeDefenseCard();
		}else{
			card.combatAction();
		}
	}

}