var playState = {
	preload: function() {
		this.fullHand = 7; //How many cards are in a full hand
		this.currentXPosition = game.world.centerX - 300;
		this.currentYPosition = game.world.centerY + (game.world.centerY * .75);
		this.currentPlayersTurn;
		for (var i = 0; i < game.global.cards.length; i++) {
			delete game.global.cards[i].visibleCard;
		}
	},

	create: function() {
		var board = new game.board(game.world.centerX, game.world.centerY, 0.5);
		game.global.currentBoard = new game.board(game.world.centerX, game.world.centerY, 0.5);
		game.global.playerOne = new game.player('Denny', 0, 10);
		game.global.playerTwo = new game.player('Travis', 0, game.global.playerOne.getHeight() + 20);

		//THIS WILL BE REMOVED ONCE THE SECOND PLAYER CAN CHOOSE HIS CARDS
		game.global.playerOne.cards = game.global.cards;
		game.global.playerTwo.cards = [];
		for (var i = 0; i < game.global.cards.length; i++) {
			var card = {};
			for(var thing in game.global.cards[i]) {
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

	changeHand: function () {
		this.killPlayerCards(this.currentPlayer.opponent);
		this.resetPlayerCards(this.currentPlayer);
	},

	createCard: function(card, i) {
		var sprite;
		var text;
		if (card.type === 'number') {
			sprite = card.color + 'Command';
			text = card.value;
		} else {
			sprite = 'abilityCommand';
			text = card.value;
			if (card.value === 'Awe') {
				var randNum = game.rnd.integerInRange(1, 9);
				card.aweValue = randNum;
				text = card.value + '\n' + randNum;
			}
		}
		card.visibleCard = game.add.sprite(this.currentXPosition + (i * 100), this.currentYPosition, sprite);

		card.visibleCard.innerText = game.add.text(0, 0,
			text, {
				font: '30px Arial',
				fill: '#ffffff',
				align: 'center'
			});
		card.visibleCard.innerText.anchor.setTo(0.5, 0.5);
		card.visibleCard.addChild(card.visibleCard.innerText);
		card.visibleCard.anchor.setTo(0.5, 0.5);

		card.visibleCard.inputEnabled = true;
		card.visibleCard.input.useHandCursor = true; //if you want a hand cursor
		card.visibleCard.card = card; //This is to create a two way binding that both sides have reference to eachother
		card.visibleCard.events.onInputDown.add(this.useCard, this);

		//NEEDS TO BE AT END
		card.visibleCard.scale.x = 0.5;
		card.visibleCard.scale.y = 0.5;
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

	killPlayerCards: function (player) {
		console.log(player);
		for(var i = 0; i < player.hand.length; i++) {
			console.log(player.hand[i].visibleCard);
			player.hand[i].visibleCard.kill();
		}
	},

	removeCard: function(card) {
		if (card.visibleCard) {
			this.removeCardFromView(card.visibleCard);
		}
		this.removeCardFromHand(card);
		delete card.visibleCard; //Used to remove refrence to the view.  Will probably need to remove it from the actual view as well
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
			player.hand[i].visibleCard.reset(this.currentXPosition + (i * 100), this.currentYPosition);
		}
	},

	setKeyOnCards: function() {
		for (var i = 0; i < this.currentPlayer.hand.length; i++) {
			this.currentPlayer.hand[i].handKey = i;
		}
	},

	useCard: function(view) {
		if (view.card.type === 'number') {
			game.global.currentBoard.playCard(view.card.value, view.card.color);
		}

		this.removeCard(view.card);
		this.changePlayersTurn();
	}
};