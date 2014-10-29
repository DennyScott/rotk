var cardSelectionState = {
	preload: function() {
		this.allNumbers = 27; //To get a 1 to 9 of each color (i.e Red, Blue, and Green)
		this.neededAmountOfCards = 30;
		this.amountOfColors = 3;
		this.budget = 100;
		this.labelEntranceMilliseconds = 1000;
		this.budgetLabelText = 'Budget Remaining: ';
	},

	create: function() {
		this.createAllCards();
		this.createAbilities();
		this.createMoneyLabel();
		this.createInstructionLabel();
		this.placeAbilitiesOnScreen();
	},

	update: function() {
		this.updateBudget();
	},

	addAbilityToDeck: function(item) {
		if (game.global.cards.length >= this.neededAmountOfCards) {
			this.destroyARandomNumberCard();
		}
		game.global.cards.push(item.card);

		this.addButton()
	},

	addButton: function() {
		if (game.global.cards.length === this.neededAmountOfCards) {
			this.createButton();
		}
	},

	addCard: function(item) {
		if (!this.canBuyCard(item)) {
			return;
		}
		this.deductFromBudget(item);
		this.addAbilityToDeck(item);

	},

	canBuyCard: function(item) {
		if (item.card.cost <= this.budget) {
			return true
		}

		return false;
	},

	createAbilities: function() {
		this.abilities = [{
			type: 'Ability',
			value: 'Awe',
			cost: 10,
			description: 'An Ability card that will do some damage to your opponent every turn it is on the board'
		}, {
			type: 'defence',
			value: 'Plead',
			cost: 15,
			description: 'A Defence command that prevents an "Attack" command while in your hand.  If played as a regular command, it will destroy a single refute or plead card of your opponents if it is currently in his/her hand'
		}, {
			type: 'attack',
			value: 'Fault',
			cost: 15,
			description: 'An Attack command that will trump any regular command and cause a bit of damage to your opponent'
		}, {
			type: 'attack',
			value: 'Argue',
			cost: 20,
			description: 'An Attack command that will trump any regular command, as well as Fault, and cause a medium amount of damage to your opponent'
		}, {
			type: 'defence',
			value: 'Refute',
			cost: 25,
			description: 'A Defence command that will prevent any Attack command your opponent plays while in your hand, as well as counter that Attack command back at your opponent.  Playing this card as a regular command will destroy all Defence cards your opponent is currently holding in hand'
		}, {
			type: 'attack',
			value: 'Incite',
			cost: 30,
			description: 'An Attack command that will trump any regular command, as well as Fault and Argue, and cause a large amount of damage to your opponent, as well as make your opponent inactive for the following 2 turns'
		}, {
			type: 'attack',
			value: 'Taunt',
			cost: 45,
			description: 'An Attack command that will trump any regular command, as well as Fault and Argue, and cause a massive amount of damage to your opponent, as well as make your opponent inactive for the following 2 turns'
		}];
	},

	createAllCards: function() {
		this.cards = [];
		game.global.hand = [];

		for (var x = 0; x < this.amountOfColors; x++) {
			var color;

			if (x === 0) {
				color = 'red';
			} else if (x === 1) {
				color = 'blue';
			} else {
				color = 'green';
			}

			for (var i = 1; i <= this.allNumbers / this.amountOfColors; i++) {

				this.cards.push({
					type: 'number',
					value: i,
					color: color
				});
			}
		}
		game.global.cards = this.cards;
	},

	createButton: function() {
		this.nextButton = game.add.button(game.world.centerX, game.world.height - 60, 'mute', this.loadState, this);
		this.nextButton.anchor.setTo(0.5, 0.5);
	},

	createInstructionLabel: function() {
		//Explain how to pick the cards and start the game
		var text = "Use you points to buy as many cards\nas you can to add to your Deck"
		var startLabel = game.add.text(game.world.width * 2, 80,
			text, {
				font: '25px Arial',
				fill: '#ffffff',
				align: 'center'
			});
		startLabel.anchor.setTo(0.5, 0.5);

		game.add.tween(startLabel).to({
			x: game.world.centerX
		}, this.labelEntranceMilliseconds).easing(Phaser.Easing.Bounce.Out).loop().start();
	},

	createMoneyLabel: function() {
		//Explain how to pick the cards and start the game
		var text = this.budgetLabelText + this.budget;
		this.budgetLabel = game.add.text(-100, 20,
			text, {
				font: '15px Arial',
				fill: '#ffffff',
				align: 'center'
			});
		this.budgetLabel.anchor.setTo(0.5, 0.5);

		game.add.tween(this.budgetLabel).to({
			x: 100
		}, this.labelEntranceMilliseconds).easing(Phaser.Easing.Bounce.Out).loop().start();
	},

	deductFromBudget: function(item) {
		this.budget -= item.card.cost;
	},

	destroyARandomNumberCard: function() {
		//This line will erase a random card in the first 27 number cards only.
		var destroyPosition = game.global.cards.splice(game.rnd.integerInRange(0, this.allNumbers - 1), 1);
	},

	loadState: function() {
		game.state.start('play');
	},

	placeAbilitiesOnScreen: function() {
		var currentPosition;
		var spaceBetweenObject = 200;
		var delayBetweenCards = 200; //In milliseconds
		var startY = game.world.centerY - 220
		var endY = game.world.centerY - 160
		var verticalSpaceBetweenCards = 300;

		for (var i = 0; i < this.abilities.length; i++) {
			if (i % 4 === 0) {
				var amountRemaining = this.abilities.length - i
				if (amountRemaining > 4) {
					currentPosition = game.world.centerX - spaceBetweenObject * 4 / 2 + (spaceBetweenObject * .5);
				} else if (amountRemaining % 2 === 0) {
					currentPosition = game.world.centerX - spaceBetweenObject * amountRemaining / 2 + (spaceBetweenObject * .5);
				} else {
					currentPosition = game.world.centerX - spaceBetweenObject * Math.floor(amountRemaining / 2);
				}
			}
			var key = this.abilities[i].value
			this[key] = game.add.sprite(currentPosition, startY, 'abilityCommand');
			this[key].alpha = 0;
			this[key].anchor.setTo(0.5, 0.5);
			this[key].card = this.abilities[i];
			this[key].textArea = game.add.text(0, 0,
				this[key].card.value, {
					font: '25px Arial',
					fill: '#ffffff'
				});
			this[key].textArea.anchor.setTo(0.5, 0.4);
			this[key].textArea.alpha = 0;
			this[key].addChild(this[key].textArea);
			this[key].inputEnabled = true;
			this[key].input.useHandCursor = true; //if you want a hand cursor
			this[key].events.onInputDown.add(this.addCard, this);
			var timeDelay = this.labelEntranceMilliseconds * 1.2 + (i * delayBetweenCards);
			var tween = game.add.tween(this[key]).to({
				alpha: 1,
				y: endY
			}, 1000, Phaser.Easing.Linear.None, true, timeDelay);

			game.add.tween(this[key].textArea).to({
				alpha: 1
			}, 1000, Phaser.Easing.Linear.None, true, timeDelay);



			var label = game.add.sprite(currentPosition, endY + 80 + 20, 'priceLabel')
			label.anchor.setTo(0.5, 0.5);
			label.textArea= game.add.text(0, 0,
				this[key].card.cost, {
					font: '20px Arial',
					fill: '#ffffff'
				});
			label.textArea.anchor.setTo(0.5, 0.3);
			label.addChild(label.textArea);
			console.log(label.textArea);

			currentPosition += spaceBetweenObject;

			if (i === 3) {
				startY += verticalSpaceBetweenCards;
				endY += verticalSpaceBetweenCards;
			}

		}
	},

	updateBudget: function() {
		this.budgetLabel.text = this.budgetLabelText + this.budget;
	}
}