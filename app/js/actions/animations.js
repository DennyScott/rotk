game.animations = {
	showCards: function(oneCard, twoCard) {
		this.clearBoard();
		this.oneCard = oneCard;
		this.twoCard = twoCard;
		this.oneCard.createView(0, 0);
		this.twoCard.createView(0, 0);
		this.createCard(oneCard, game.world.centerX - oneCard.view().width, game.world.height - oneCard.view().height, 0.75, -20);
		this.createCard(twoCard, game.world.centerX + twoCard.view().width, game.world.height - twoCard.view().height, 0.75, 20);
	},

	createCard: function(card, x, y, scale, fromTween) {
		card.view().scale.x = card.view().scale.y = scale;
		card.view().x = x + fromTween;
		card.view().y = y;
		card.view().alpha = 0;
		game.add.tween(card.view()).to({
			alpha: 1,
			x: x
		}, 800, Phaser.Easing.Linear.None, true, 1000);
	},

	clearBoard: function() {
		game.global.playerOne.clearCards();
		game.global.playerTwo.clearCards();
	},

	cardWinner: function(winner, loser) {
		var tween = game.add.tween(loser.view()).to({
			alpha: 0,
			y: loser.view().y - 20
		}, 1200, Phaser.Easing.Linear.None, true, 800)
		tween.onComplete.add(this.removeCards, this);
	},

	removeCards: function() {
		game.add.tween(this.twoCard.view()).to({
			alpha: 0,
		}, 600, Phaser.Easing.Linear.None, true, 600);

		var tween = game.add.tween(this.oneCard.view()).to({
			alpha: 0,
		}, 600, Phaser.Easing.Linear.None, true, 600);
		tween.onComplete.add(this.destroyCards, this);
		tween.onComplete.add(game.global.round.changeTurn, game.global.round.context);

	},

	destroyCards: function(){
		this.oneCard.view().destroy();
			this.twoCard.view().destroy();
			this.oneCard = undefined;
			this.twoCard = undefined;
		},

	cardsEqual: function(oneCard, twoCard) {
		game.add.tween(oneCard.view()).to({
			alpha: 0,
			y: oneCard.view().y - 20
		}, 800, Phaser.Easing.Linear.None, true, 1000);

		var tween = game.add.tween(twoCard.view()).to({
			alpha: 0,
			y: twoCard.view().y - 20
		}, 800, Phaser.Easing.Linear.None, true, 1000);

		tween.onComplete.add(this.removeCards, this);
	}
}