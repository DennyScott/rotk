var playState = {
	preload: function() {
		this.fullHand = 7; //How many cards are in a full hand
		this.currentXPosition = game.world.centerX - 300;
		this.currentYPosition = game.world.centerY + (game.world.centerY * .75);
		this.currentPlayersTurn;
		for (var i = 0; i < game.global.cards.length; i++) {
			delete game.global.cards[i].view();
		}
	},

	create: function() {
		var board = new game.board(game.world.centerX, game.world.centerY, 0.5);
		game.global.currentBoard = new game.board(game.world.centerX, game.world.centerY, 0.5);
		game.global.playerOne = new game.player('Denny', 0, 10);
		game.global.playerTwo = new game.player('Travis', 0, game.global.playerOne.getHeight() + 20);
		game.global.arrow = new game.arrow(game.world.centerX + 200,
			0, .5);

		this.comboValue = 10;


		//THIS WILL BE REMOVED ONCE THE SECOND PLAYER CAN CHOOSE HIS CARDS
		game.global.playerOne.cards = game.global.cards;
		game.global.playerTwo.cards = [];
		for (var i = 0; i < game.global.cards.length; i++) {
			var card = {};
			for (var thing in game.global.cards[i]) {
				card[thing] = game.global.cards[i][thing];
			}
			game.global.playerTwo.cards.push(card);
		}

		//END OF THE REMOVE SECTION

		game.global.playerOne.hand = [];
		game.global.playerTwo.hand = [];

		game.global.playerOne.opponent = game.global.playerTwo;
		game.global.playerTwo.opponent = game.global.playerOne;

		game.global.playerOne.name = 'Player One';
		game.global.playerTwo.name = 'Player Two';

		while (game.global.playerOne.hand.length < this.fullHand) {
			this.drawCard(game.global.playerOne);
		}

		while (game.global.playerTwo.hand.length < this.fullHand) {
			this.drawCard(game.global.playerTwo);
		}

		this.currentPlayer = game.global.playerOne;
		this.setKeyOnCards();
		this.createVisibleCards();
		this.killPlayerCards(this.currentPlayer.opponent);
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
			currentPlayerEffect(this.comboValue);
			opposingPlayerEffect(this.comboValue);
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
		for (var i = 0; i < this.currentPlayer.hand.length; i++) {
			this.currentPlayer.hand[i].handKey = i;
		}
	},

	useCard: function(view) {
		if (view.card.type === 'number') {
			var combo = game.global.currentBoard.playCard(view.card.value, view.card.color);
			this.checkCombo(combo);
		}

		this.removeCard(view.card);
		this.changePlayersTurn();
	}
};