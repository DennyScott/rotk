game.animations = {
	showCards: function(oneCard, twoCard) {
		this.clearBoard();
		oneCard.createView(0,0);
		twoCard.createView(0,0);
		this.createCard(oneCard, game.world.centerX - oneCard.view().width, game.world.height - oneCard.view().height, 0.75, -20);
		this.createCard(twoCard, game.world.centerX + twoCard.view().width, game.world.height - twoCard.view().height, 0.75, 20);
	},

	createCard: function(card, x, y, scale, fromTween){
		card.view().scale.x = card.view().scale.y = scale;
		card.view().x = x + fromTween;
		card.view().y = y;	
		card.view().alpha = 0;
		game.add.tween(card.view()).to({
			alpha: 1,
			x: x
		}, 800, Phaser.Easing.Linear.None, true, 1000);
	},

	clearBoard: function () {
		game.global.playerOne.clearCards();
		game.global.playerTwo.clearCards();
	}
}