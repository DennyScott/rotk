game.chainProperties.defenseChain = {

	bothDefend: function(oneCard, twoCard) {
		//Do Nothing, probably want an animation here
		
		game.global.turnWon = true;
	},

	singleDefence: function(oneCard){
		oneCard.combatAction();
	}
}