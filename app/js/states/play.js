var playState = {
	preload: function() {
		this.currentXPosition = game.world.centerX - 300;
		this.currentYPosition = game.world.centerY + (game.world.centerY * .75);
		this.currentPlayer = game.global.playerOne;
	},

	create: function() {
		var board = new game.board(game.world.centerX, game.world.centerY, 0.5);
		game.global.currentBoard = new game.board(game.world.centerX, game.world.centerY, 0.5);
		game.global.playerOne.createView(0, 10);
		game.global.playerTwo.createView(0, game.global.playerOne.getHeight() + 20);
		game.global.arrow = new game.arrow(game.world.centerX + 200,
			0, .5);

		game.global.comboValue = 10;
		game.global.turnDamage = 5;
		game.global.aweDamage = 5;

		//THIS WILL BE REMOVED ONCE THE SECOND PLAYER CAN CHOOSE HIS CARDS-------------------------------------------
		game.global.playerOne.deck = game.global.cards;
		game.global.playerTwo.deck = [];

		for (var x = 0; x < 3; x++) {
			var color;

			if (x === 0) {
				color = 'red';
			} else if (x === 1) {
				color = 'blue';
			} else {
				color = 'green';
			}

			for (var i = 1; i <= 27 / 3; i++) {

				game.global.playerTwo.deck.push(new game.RegularCommand('number', i, color));
			}
		}

		//END OF THE REMOVE SECTION---------------------------------------------------------------------------------

		game.global.playerOne.prepare();
		game.global.playerTwo.prepare();
		this.setUpInitalTurn();

	},

	update: function() {

	},

	changePlayersTurn: function() {
		this.currentPlayer = this.currentPlayer.opponent;
		this.changeHand();
		this.setKeyOnCards();
	},

	changeHand: function() {
		this.killPlayerCards(this.currentPlayer.opponent);
		this.resetPlayerCards(this.currentPlayer);
	},

	createCard: function(card, i) {
		card.createView(this.currentXPosition + (i * 100), this.currentYPosition);

		card.view().events.onInputDown.add(this.useCard, this);

		//NEEDS TO BE AT END
		card.view().scale.x = 0.5;
		card.view().scale.y = 0.5;
	},

	createVisibleCards: function() {
		for (var i = 0; i < this.currentPlayer.hand.length; i++) {
			this.createCard(game.global.playerOne.hand[i], i);
			this.createCard(game.global.playerTwo.hand[i], i);
		}
		this.killPlayerCards(this.currentPlayer.opponent);
	},

	drawCard: function(player) {
		var randNum = game.rnd.integerInRange(0, player.cards.length - 1);
		//This line will remove a card from the deck, and put it into your hand
		player.hand.push(player.cards[randNum]);

		player.cards.splice(randNum, 1)
	},

	killPlayerCards: function(player) {
		for (var i = 0; i < player.hand.length; i++) {
			player.hand[i].view().kill();
		}
	},

	setUpInitalTurn: function() {
		this.resetPlayerCards(this.currentPlayer);
		this.setKeyOnCards();
		// command.view().events.onInputDown.add(function() {
		// 	console.log('used card')
		// }, this);

		//NEEDS TO BE AT END
		// card.view().scale.x = 0.5;
		// card.view().scale.y = 0.5;
	},

	useCard: function(view) {
		if (view.card.type === 'number') {
			var combo = game.global.currentBoard.playNumberCard(view.card.value, view.card.color);
			this.checkCombo(combo);
		}
		//game.eventChain.playCards(playerOneCard, playerTwoCard); FOR TRAVIS
		this.removeCard(view.card);
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

	removeCard: function(card) {
		if (card.view()) {
			this.removeCardFromView(card.view());
		}
		this.removeCardFromHand(card);
		card.clearView(); //Used to remove refrence to the view.  Will probably need to remove it from the actual view as well
	},

	removeCardFromHand: function(card) {
		this.currentPlayer.hand.splice(card.handKey, 1);
		this.setKeyOnCards();
	},

	removeCardFromView: function(view) {
		view.kill();
	},

	resetPlayerCards: function(player) {
		for (var i = 0; i < player.hand.length; i++) {
			player.hand[i].view().reset(this.currentXPosition + (i * 100), this.currentYPosition);
		}
	},

	setKeyOnCards: function() {

	},
};