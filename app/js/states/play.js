var playState = {
	preload: function() {

	},

	create: function() {
		var board = new game.board(game.world.centerX, game.world.centerY, 0.5);	
		game.global.playerOne = new game.player('Denny', 0 , 10);
		game.global.playerTwo = new game.player('Travis', 0, game.global.playerOne.getHeight() + 20);
	},

	update: function() {

	}
};