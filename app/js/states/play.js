var playState = {
	preload: function() {
		this.currentPlayer = game.global.playerOne;
	},

	create: function() {
		game.global.currentBoard = new game.board(game.world.centerX, game.world.centerY, 0.5);
		game.global.playerOne.createView(0, 10);
		game.global.playerTwo.createView(0, game.global.playerOne.getHeight() + 20);
		game.global.arrow = new game.arrow(game.world.centerX + 200,
			0, .5);
		game.global.round = {
			endRound: false
		}


		game.global.playerOne.prepare(this.useCard, this);
		game.global.playerTwo.prepare(this.useCard, this);
		this.currentPlayer.startTurn();

	},

	update: function() {

	},

	changePlayersTurn: function() {
		this.currentPlayer = this.currentPlayer.opponent;
		this.currentPlayer.opponent.endTurn();
		this.currentPlayer.startTurn();
	},

	useCard: function(view) {
		game.global.round[this.currentPlayer.name()] = view.card;
		this.currentPlayer.removeCommand(view.card);


		if (game.global.endTurn) {
			game.eventChain.playCards(game.global.round[game.global.playerOne.name()], game.global.round[game.global.playerTwo.name()]);
		}
		
		this.changePlayersTurn();
		game.global.endTurn = !game.global.endTurn;
	},

};