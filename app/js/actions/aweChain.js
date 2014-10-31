game.chainProperties.aweChain = {
	playAwe: function(card){
		game.global.currentBoard.playAweCard(card.value, card.owner.opponent);	
	},

	handleAwe: function(){
		var awes = game.global.currentBoard.getAwes();
		
		for(var i = 0; i > awes.length; i++){
			awes[i].player.takeDamage(game.global.aweDamage);
		}	
	}	
}