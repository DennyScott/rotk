var cardSelectionState = {
	preload: function() {
		console.log('selecting cards!');
		this.allNumbers = 27; //To get a 1 to 9 of each color (i.e Red, Blue, and Green)
		this.amountOfColors = 3;
	},

	create: function() {
		this.createAllCards();
		game.state.start('play');
	},

	update: function() {

	},

	createAllCards: function() {
		this.cards = [];
		for (var x = 0; x < this.amountOfColors; x++) {
			var color;

			if(x === 0) {
				color = 'red';
			} else if (x === 1) {
				color = 'blue';
			} else {
				color = 'green';
			}

			for (var i = 1; i <= this.allNumbers/this.amountOfColors; i++) {

				this.cards.push({number: i, color: color});
			}
		}
		game.global.cards = this.cards;
	}
}