var playState = {
	preload: function() {
		this.fullHand = 7; //How many cards are in a full hand
		this.hand = [];
	},

	create: function() {
		var board = new game.board();
		while(this.hand.length < this.fullHand){
			this.drawCard();
		}
		this.createVisibleCards();
	},

	update: function() {

	},

	createCard: function(card) {
		game.add.sprite()
	},

	createVisibleCards: function() {
		for(var i = 0; i < this.hand.length; i++) {
			if(typeof this.hand[i].visibleCard !== 'undefined') {
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
	}
};