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
		if (view.card.type === 'number') {
			var combo = game.global.currentBoard.playNumberCard(view.card.value, view.card.color);
			this.checkCombo(combo);
		}
		//game.eventChain.playCards(playerOneCard, playerTwoCard); FOR TRAVIS
		this.currentPlayer.removeCommand(view.card);
		this.changePlayersTurn();
	},

	checkCombo: function(combo) {
		if (combo.win.length > 0) {
			this.handleCombo(combo.win, game.global.playerOne.heal, game.global.playerTwo.takeDamage);
		}

		if (combo.lose.length > 0) {
			this.handleCombo(combo.lose, game.global.playerOne.takeDamage, game.global.playerTwo.heal);
		}
	},

	handleCombo: function(combo, currentPlayerEffect, opposingPlayerEffect) {
		for (var i = 0; i < combo.length; i++) {
			game.global.currentBoard.clearCombo(combo[i]);
			currentPlayerEffect(game.global.comboValue);
			opposingPlayerEffect(game.global.comboValue);
			game.global.arrow.flip();
		}
	},
};