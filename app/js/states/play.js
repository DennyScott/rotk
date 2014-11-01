var playState = {
	preload: function() {
	},

	create: function() {
		this.createBoardAssets();
		this.prepareForGame();
	},

	update: function() {

	},

	useCard: function(view) {
		game.global.round[game.global.currentPlayer.name()] = view.card;
		game.global.currentPlayer.removeCommand(view.card);


		if (game.global.endTurn) {
			this.endOfTurnChain();
		}

		this.changePlayersTurn();
		game.global.endTurn = !game.global.endTurn;
	},

	endOfTurnChain: function() {
		game.eventChain.playCards(game.global.round[game.global.playerOne.name()], game.global.round[game.global.playerTwo.name()]);
		this.drawCards();
	},

	drawCards: function(){
		game.global.playerOne.drawCards();
		game.global.playerTwo.drawCards();
	},

	changePlayersTurn: function() {
		game.global.currentPlayer = game.global.currentPlayer.opponent;
		game.global.currentPlayer.opponent.endTurn();
		game.global.currentPlayer.startTurn();
	},

	createBoardAssets: function() {
		game.global.currentBoard = new game.board(game.world.centerX, game.world.centerY, 0.5);
		game.global.playerOne.createView(0, 10);
		game.global.playerTwo.createView(0, game.global.playerOne.getHeight() + 20);
		game.global.arrow = new game.arrow(game.world.centerX + 200,
			0, .5);
	},

	prepareForGame: function() {
		game.global.round = {
			endRound: false
		}

		game.global.playerOne.prepare(this.useCard, this);
		game.global.playerTwo.prepare(this.useCard, this);
		game.global.currentPlayer.startTurn();
	}
};