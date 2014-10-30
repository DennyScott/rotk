var playState = {
	preload: function() {
		this.fullHand = 7; //How many cards are in a full hand
		this.hand = [];
		this.currentXPosition = game.world.centerX - 300;
		this.currentYPosition = game.world.centerY + (game.world.centerY * .75);
		for (var i = 0; i < game.global.cards.length; i++) {
			game.global.cards[i].visibleCard = undefined;
		}
	},

	create: function() {
		var board = new game.board(game.world.centerX, game.world.centerY, 0.5);
		game.global.currentBoard = new game.board(game.world.centerX, game.world.centerY, 0.5);	
		game.global.playerOne = new game.player('Denny', 0 , 10);
		game.global.playerTwo = new game.player('Travis', 0, game.global.playerOne.getHeight() + 20);
		game.global.arrow = new game.arrow(game.world.centerX + 200, 
			0, .5);

		this.comboValue = 10;


		while (this.hand.length < this.fullHand) {
			this.drawCard();
		}
		this.createVisibleCards();
	},

	update: function() {

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
			if(card.value === 'Awe') {
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
		for (var i = 0; i < this.hand.length; i++) {
			if (typeof this.hand[i].visibleCard !== 'undefined') {
				return;
			}

			this.createCard(this.hand[i], i);
			// this.hand[i].visibleCard
		}
	},

	drawCard: function() {
		var randNum = game.rnd.integerInRange(0, game.global.cards.length - 1);

		//This line will remove a card from the deck, and put it into your hand
		this.hand.push(game.global.cards[randNum]);

		game.global.cards.splice(randNum, 1)
	},

	useCard: function (view) {
		delete view.card.visibleCard; //Used to remove refrence to the view.  Will probably need to remove it from the actual view as well
		if(view.card.type === 'number'){
			var combo = game.global.currentBoard.playCard(view.card.value, view.card.color);
			this.checkCombo(combo);
		}
	},

	checkCombo: function(combo) {
		if(combo.win.length > 0){
			this.handleCombo(combo.win, game.global.playerOne.heal, game.global.playerTwo.takeDamage);
		}

		if(combo.lose.length > 0){
			this.handleCombo(combo.lose, game.global.playerOne.takeDamage, game.global.playerTwo.heal);
		}
	},

	handleCombo: function(combo, currentPlayerEffect, opposingPlayerEffect){
		for(var i = 0; i < combo.length; i++){
				game.global.currentBoard.clearCombo(combo[i]);
				currentPlayerEffect(this.comboValue);
				opposingPlayerEffect(this.comboValue);
				game.global.arrow.flip();
			}
	}
};