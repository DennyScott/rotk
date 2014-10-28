var cardSelectionState = {
	preload: function() {
		this.allNumbers = 27; //To get a 1 to 9 of each color (i.e Red, Blue, and Green)
		this.amountOfColors = 3;
		this.salary = 100;
	},

	create: function() {
		this.createAllCards();
		this.createAbilities();
		this.loadState();

	},

	update: function() {

	},

	createAbilities: function() {
		var abilities = [{
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
		}, ]
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

	loadState: function() {
		game.state.start('play');
	}
}