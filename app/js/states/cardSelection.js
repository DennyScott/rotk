var game;
var Phaser;
window.states = window.states || {};


window.states.cardSelectionState = {
	preload: function() {
		game = window.game || {};
		Phaser = window.Phaser || {};
		this.budget = 120;
		this.labelEntranceMilliseconds = 1000;
		this.budgetLabelText = 'Budget Remaining: ';
		game.global.currentPlayer = game.global.currentPlayer;
	},

	create: function() {
		this.createAbilities();
		this.createMoneyLabel();
		this.placeAbilitiesOnScreen();
		this.placeTextFieldAtTop();
	},

	update: function() {
		this.updateBudget();
	},

	addAbilityToDeck: function(item) {
		if (game.global.currentPlayer.deck.length >= game.global.neededAmountOfCards) {
			this.destroyARandomNumberCard();
		}
		var newCommand;
		var player = game.global.currentPlayer;
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
		game.global.currentPlayer.deck.push(newCommand);

		this.addButton();
	},

	addButton: function() {
		if (game.global.currentPlayer.deck.length === game.global.neededAmountOfCards) {
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
			return true;
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

	createButton: function() {
		this.nextButton = game.add.button(game.world.centerX, game.world.height * 0.9, 'nextButton', this.loadState, this);
		this.nextButton.anchor.setTo(0.5, 0.5);
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
		game.global.currentPlayer.deck.splice(game.rnd.integerInRange(0, this.allNumbers - 1), 1);
	},

	loadState: function() {
		game.global.currentPlayer.hasChosenCommands = true;
		game.global.currentPlayer = game.global.currentPlayer.opponent;
		if (game.global.currentPlayer.hasChosenCommands !== true) {
			game.state.start('cardSelection');
		} else {
			game.state.start('play');
		}
	},

	placeAbilitiesOnScreen: function() {
		var currentPosition; //The current position of cards
		var minHorizontalSpace = 80;
		var moreHorizontalSpace = game.world.width * 0.15;
		var minVerticalSpace = 120;
		var moreVerticalSpace = game.world.height * 0.25;
		var spaceBetweenObject = moreHorizontalSpace > minHorizontalSpace ? moreHorizontalSpace : minHorizontalSpace; //The space between cards in the same row
		var verticalSpaceBetweenCards = moreHorizontalSpace > minVerticalSpace ? moreVerticalSpace : minVerticalSpace; //The space between rows of cards

		var delayBetweenCards = 200; //In milliseconds
		var startY = game.world.centerY - 100; //Where the animation starts for the cards
		var endY = game.world.centerY - 60; //Where the animation ends for the cards


		for (var i = 0; i < this.abilities.length; i++) {

			currentPosition = this.getLineStartPosition(i, spaceBetweenObject, currentPosition); //Gets the positon of this item, if its a new row

			var timeDelay = this.labelEntranceMilliseconds * 1.2 + (i * delayBetweenCards); //Gets the delay time of the animation for this item
			this.abilities[i].timeDelay = timeDelay;

			this.placeCard(currentPosition, startY, endY, this.abilities[i], timeDelay); //Places the card and label onto the screen

			currentPosition += spaceBetweenObject; //Updates the currentPosition

			if (i === 3) {
				//Updates the screen to a new row
				startY += verticalSpaceBetweenCards;
				endY += verticalSpaceBetweenCards;
			}

		}
	},


	getLineStartPosition: function(i, spaceBetweenObject, currentPosition) {
		if (i % 4 === 0) {
			//If i is not divisable by 4, its not the start of a line, meaning currentPosition will simply be returned as is
			var amountRemaining = this.abilities.length - i;
			if (amountRemaining > 4) {
				//If its greater then 4, then we not on the last line yet of cards
				currentPosition = game.world.centerX - spaceBetweenObject * 4 / 2 + (spaceBetweenObject * 0.5);
			} else if (amountRemaining % 2 === 0) {
				//If the cards remaining is less then 4, and is evenly divisible
				currentPosition = game.world.centerX - spaceBetweenObject * amountRemaining / 2 + (spaceBetweenObject * 0.5);
			} else {
				//If the amount of cards left is less then 4, and not evenly divisible
				currentPosition = game.world.centerX - spaceBetweenObject * Math.floor(amountRemaining / 2);
			}
		}

		return currentPosition; //return the position of this item
	},

	placeCard: function(x, y, endY, ability) {
		var key = ability.value;
		var timeDelay = ability.timeDelay;
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

		this[key].scale.x = 0.5;
		this[key].scale.y = 0.5;
		delete ability.timeDelay;

	},

	placeCardLabel: function(x, y, card) {
		var label = game.add.sprite(x, y + 50, 'priceLabel');
		label.anchor.setTo(0.5, 0.5);
		label.textArea = game.add.text(0, 0,
			card.cost, {
				font: '20px Arial',
				fill: '#ffffff'
			});
		label.textArea.anchor.setTo(0.5, 0.3);
		label.addChild(label.textArea);

		label.scale.x = 0.5;
		label.scale.y = 0.5;
	},

	placeTextFieldAtTop: function() {
		var playerNameText = game.global.currentPlayer.name() + ",\nChoose Your Abilities!";
		this.playerNameWarning = game.add.text(game.world.centerX, game.world.height * 0.15 - 10,
			playerNameText, {
				font: '30px Arial',
				fill: '#ffffff',
				align: 'center'
			});
		this.playerNameWarning.anchor.setTo(0.5, 0.5);
		this.playerNameWarning.alpha = 0;

		game.add.tween(this.playerNameWarning).to({
			alpha: 1,
			y: this.playerNameWarning.y + 10
		}, 1000, Phaser.Easing.Linear.None, true, 1000);

	},

	setUpCardAnimation: function(card, endY, timeDelay) {
		game.add.tween(card).to({
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

};