var game = window.game || {};

game.chainProperties.aweChain = {
	/**
	 * Play an Awe Command Card. This card will sit on the board, and 
	 * damage the opponent each turn that another card of the same number
	 * is played.
	 * 
	 * @param  {Object} card Awe Command Card
	 */
	single: function(card, otherCard){
		game.global.currentBoard.playAweCard(card.value, card.owner.opponent);

		if(!game.global.turnWon){
			game.animations.cardsEqual(card, otherCard);
			game.global.turnWon = true;
		}	
	},

	both: function(oneCard, twoCard){
		game.animations.cardsEqual(oneCard, twoCard);
	},

	/**
	 * Handle the Awe Commands for any awe's currently sitting on the board. 
	 * For each awe on the board, hurt the opponent.
	 * 
	 */
	handleAwe: function(){
		var awes = game.global.currentBoard.getAwes(); //Get all Awes
		//Iterate through each awe, damaging the opponent
		for(var i = 0; i < awes.length; i++){
			awes[i].player.takeDamage(game.global.aweDamage);
		}	
	}	
};