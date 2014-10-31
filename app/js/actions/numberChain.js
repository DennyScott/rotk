game.chainProperties.numberChain = {

	bothNumber: function(oneCard, twoCard) {
		if (oneCard.value > twoCard.value) {
			this.damageOpponent(oneCard);
			this.playCard([oneCard, twoCard]);
		} else if (twoCard.value > oneCard.value) {
			this.damageOpponent(twoCard);
			this.playCard([twoCard, oneCard]);
		} else {
			//Cancel out animation
		}
	},

	singleNumber: function(card) {
		if (!game.global.turnWon) {
			this.damageOpponent(card);
			this.playCard([card]);
		}

	},

	playCard: function(cards) {
		for (var i = 0; i < cards.length; i++) {
			var combo = game.global.currentBoard.playCard(cards[i].value, cards[i].color);
			this.checkCombo(combo, cards[i]);
		}
	},

	checkCombo: function(combo, card) {
		if (combo.win.length > 0) {
			this.handleCombo(combo.win, card.owner.heal, card.owner.opponent.takeDamage);
		}

		if (combo.lose.length > 0) {
			this.handleCombo(combo.lose, card.owner.takeDamage, card.owner.opponent.heal);
		}
	},

	handleCombo: function(combo, currentPlayerEffect, opposingPlayerEffect) {
		for (var i = 0; i < combo.length; i++) {
			game.global.currentBoard.clearCombo(combo[i]);
			currentPlayerEffect(game.gloabl.comboValue);
			opposingPlayerEffect(game.global.comboValue);
			game.global.arrow.flip();
		}
	},

	damageOpponent: function(card) {
		card.owner.opponent.takeDamage(game.global.turnDamage);
		game.global.turnWon = true;
	}
}