var cardSelectionState = {
	preload: function() {
		this.allNumbers = 27; //To get a 1 to 9 of each color (i.e Red, Blue, and Green)
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
		this.createButton();
		this.placeAbilitiesOnScreen();
	},

	update: function() {
		this.updateBudget();
	},

	addAbilityToDeck: function(item) {
		game.global.cards.push(item.card);
	},

	canBuyCard: function(item) {
		if(item.card.cost <= this.budget) {
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
		this.nextButton = game.add.button(game.world.centerX, game.world.height - 40, 'mute', this.loadState, this);
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

	loadState: function() {
		game.state.start('play');
	},

	placeAbilitiesOnScreen: function() {
		var currentPosition;
		var spaceBetweenObject = 50;
		var delayBetweenCards = 200; //In milliseconds

		if (this.abilities.length % 2 === 0) {
			currentPosition = game.world.centerX - spaceBetweenObject * this.abilities.length / 2 + (spaceBetweenObject * .5);
		} else {
			currentPosition = game.world.centerX - spaceBetweenObject * Math.floor(this.abilities.length / 2);
		}

		for (var i = 0; i < this.abilities.length; i++) {
			var key = this.abilities[i].value
			this[key] = game.add.sprite(currentPosition, game.world.centerY - 70, 'card');
			this[key].alpha = 0;
			this[key].anchor.setTo(0.5, 0.5);
			this[key].card = this.abilities[i];
			this[key].inputEnabled = true;
			this[key].input.useHandCursor = true; //if you want a hand cursor
			this[key].events.onInputDown.add(function(item) {
				if (this.canBuyCard(item)) {
					this.deductFromBudget(item);
					this.addAbilityToDeck(item);
				}
			}, this);
			currentPosition += spaceBetweenObject;
			var timeDelay = this.labelEntranceMilliseconds * 1.2 + (i * delayBetweenCards);
			var tween = game.add.tween(this[key]).to({
				alpha: 1,
				y: game.world.centerY
			}, 1000, Phaser.Easing.Linear.None, true, timeDelay);
		}
	},

	updateBudget: function() {
		this.budgetLabel.text = this.budgetLabelText + this.budget;
	}
}