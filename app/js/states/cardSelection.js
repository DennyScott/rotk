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
		var newCommand;
		var player = 'player';
		if (item.card.value === 'Awe') {
			newCommand = new game.AweCommand(player);
		} else if (item.card.value === 'Plead') {
			newCommand = new game.PleadCommand(player);
		} else if (item.card.value === 'Fault') {
			newCommand = new game.FaultCommand(player);
		} else if (item.card.value === 'Argue') {
			newCommand = new game.ArgueCommand(player);
		} else if (item.card.value === 'Refute') {
			newCommand = new game.RefuteCommand(player);
		} else if (item.card.value === 'Incite') {
			newCommand = new game.InciteCommand(player);
		} else if (item.card.value === 'Taunt') {
			newCommand = new game.TauntCommand(player);
		}
		game.global.cards.push(newCommand);

		this.addButton();
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
		this.updateSpriteCounter(item);

	},

	canBuyCard: function(item) {
		if (item.card.cost <= this.budget) {
			return true
		}

		return false;
	},

	createAbilities: function() {
		this.abilities = [{
			type: 'Awe',
			value: 'Awe',
			cost: 10,
			description: ''
		}, {
			type: 'defence',
			value: 'Plead',
			cost: 15,
			description: ''
		}, {
			type: 'attack',
			value: 'Fault',
			cost: 15,
			description: ''
		}, {
			type: 'attack',
			value: 'Argue',
			cost: 20,
			description: ''
		}, {
			type: 'defence',
			value: 'Refute',
			cost: 25,
			description: ''
		}, {
			type: 'attack',
			value: 'Incite',
			cost: 30,
			description: ''
		}, {
			type: 'attack',
			value: 'Taunt',
			cost: 45,
			description: ''
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

				this.cards.push(new game.RegularCommand('number', i, color));
			}
		}
		game.global.cards = this.cards;
	},

	createButton: function() {
		this.nextButton = game.add.button(game.world.centerX, game.world.height - 60, 'nextButton', this.loadState, this);
		this.nextButton.anchor.setTo(0.5, 0.55);
		var text = 'Begin';
		this.nextButton.buttonText = game.add.text(0, 0,
			text, {
				font: '20px Arial',
				fill: '#ffffff',
				align: 'center'
			});
		this.nextButton.buttonText.anchor.setTo(0.5, 0.5);
		this.nextButton.addChild(this.nextButton.buttonText);
		this.nextButton.input.useHandCursor = true; //if you want a hand cursor
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

	getLineStartPosition: function(i, spaceBetweenObject, currentPosition) {
		if (i % 4 === 0) {
			//If i is not divisable by 4, its not the start of a line, meaning currentPosition will simply be returned as is
			var amountRemaining = this.abilities.length - i
			if (amountRemaining > 4) {
				//If its greater then 4, then we not on the last line yet of cards
				currentPosition = game.world.centerX - spaceBetweenObject * 4 / 2 + (spaceBetweenObject * .5);
			} else if (amountRemaining % 2 === 0) {
				//If the cards remaining is less then 4, and is evenly divisible
				currentPosition = game.world.centerX - spaceBetweenObject * amountRemaining / 2 + (spaceBetweenObject * .5);
			} else {
				//If the amount of cards left is less then 4, and not evenly divisible
				currentPosition = game.world.centerX - spaceBetweenObject * Math.floor(amountRemaining / 2);
			}
		}

		return currentPosition; //return the position of this item
	},

	loadState: function() {
		game.state.start('play');
	},

	placeAbilitiesOnScreen: function() {
		var currentPosition; //The current position of cards
		var spaceBetweenObject = 100; //The space between cards in the same row
		var delayBetweenCards = 200; //In milliseconds
		var startY = game.world.centerY - 100; //Where the animation starts for the cards
		var endY = game.world.centerY - 80; //Where the animation ends for the cards
		var verticalSpaceBetweenCards = 150; //The space between rows of cards

		for (var i = 0; i < this.abilities.length; i++) {

			currentPosition = this.getLineStartPosition(i, spaceBetweenObject, currentPosition); //Gets the positon of this item, if its a new row

			var timeDelay = this.labelEntranceMilliseconds * 1.2 + (i * delayBetweenCards); //Gets the delay time of the animation for this item

			this.placeCard(currentPosition, startY, endY, this.abilities[i], timeDelay); //Places the card and label onto the screen

			currentPosition += spaceBetweenObject; //Updates the currentPosition

			if (i === 3) {
				//Updates the screen to a new row
				startY += verticalSpaceBetweenCards;
				endY += verticalSpaceBetweenCards;
			}

		}
	},

	placeCard: function(x, y, endY, ability, timeDelay) {
		var key = ability.value
		this[key] = game.add.sprite(x, y, 'abilityWithQuantity');
		this[key].alpha = 0;
		this[key].anchor.setTo(0.5, 0.5);
		this[key].card = ability;
		this[key].textArea = game.add.text(0, 0,
			this[key].card.value, {
				font: '30px Arial',
				fill: '#ffffff'
			});
		this[key].textArea.anchor.setTo(0.5, 0.4);
		this[key].textArea.alpha = 0;
		this[key].addChild(this[key].textArea);
		this.setUpCardInputs(this[key]);
		this.setUpSpriteCounter(this[key]);
		this.setUpCardAnimation(this[key], endY, timeDelay);

		this.placeCardLabel(x, endY, this[key].card);

		this[key].scale.x = .5;
		this[key].scale.y = .5;

	},

	placeCardLabel: function(x, y, card) {
		var label = game.add.sprite(x, y + 40 + 20, 'priceLabel')
		label.anchor.setTo(0.5, 0.5);
		label.textArea = game.add.text(0, 0,
			card.cost, {
				font: '20px Arial',
				fill: '#ffffff'
			});
		label.textArea.anchor.setTo(0.5, 0.3);
		label.addChild(label.textArea);

		label.scale.x = .5;
		label.scale.y = .5;
	},

	setUpCardAnimation: function(card, endY, timeDelay) {
		var tween = game.add.tween(card).to({
			alpha: 1,
			y: endY
		}, 1000, Phaser.Easing.Linear.None, true, timeDelay);

		game.add.tween(card.textArea).to({
			alpha: 1
		}, 1000, Phaser.Easing.Linear.None, true, timeDelay);
	},

	setUpCardInputs: function(card) {
		card.inputEnabled = true;
		card.input.useHandCursor = true; //if you want a hand cursor
		card.events.onInputDown.add(this.addCard, this);
	},

	setUpSpriteCounter: function(item) {
		item.spriteCount = item.spriteCount || 0;
		var text = '' + item.spriteCount;
		item.textSpriteCount = game.add.text(-45, -47,
			text, {
				font: '20px Arial',
				fill: '#000000'
			});
		item.textSpriteCount.anchor.setTo(0.5, 0.3);
		item.addChild(item.textSpriteCount);

	},

	updateBudget: function() {
		this.budgetLabel.text = this.budgetLabelText + this.budget;
	},

	updateSpriteCounter: function(item) {
		item.spriteCount++;
		item.textSpriteCount.text = item.spriteCount + '';
	}

}