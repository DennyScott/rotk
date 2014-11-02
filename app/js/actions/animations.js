var game = window.game || {};
var Phaser = window.Phaser || {};

game.animations = {
	showCards: function(oneCard, twoCard) {
		this.clearBoard();

		if (typeof oneCard !== 'undefined') {
			this.oneCard = oneCard;
			this.oneCard.createView(0, 0);
			this.createCard(oneCard, {
				x: game.world.centerX - oneCard.view().width, 
				y: game.world.height - oneCard.view().height, 
				scale: 0.75, 
				fromTween: -20
			});
		}

		if (typeof twoCard !== 'undefined') {
			this.twoCard = twoCard;
			this.twoCard.createView(0, 0);
			this.createCard(twoCard, {
				x: game.world.centerX + twoCard.view().width, 
				y: game.world.height - twoCard.view().height, 
				scale: 0.75, 
				fromTween: 20
			});
		}

	},

	createCard: function(card, options) {
		card.view().scale.x = card.view().scale.y = options.scale;
		card.view().x = options.x + options.fromTween;
		card.view().y = options.y;
		card.view().alpha = 0;
		game.add.tween(card.view()).to({
			alpha: 1,
			x: options.x
		}, 800, Phaser.Easing.Linear.None, true, 1000);
	},

	clearBoard: function() {
		game.global.playerOne.clearCards();
		game.global.playerTwo.clearCards();
	},

	cardWinner: function(winner, loser) {
		loser = this.checkCardsExist(loser);
		var tween = game.add.tween(loser.view()).to({
			alpha: 0,
			y: loser.view().y - 20
		}, 1200, Phaser.Easing.Linear.None, true, 800);
		tween.onComplete.add(this.removeCards, this);
	},

	checkCardsExist: function(card) {
			if (typeof card === 'undefined') {
				return this.createTempView();
			}

			return card;
	},

	createTempView: function() {
		return {
			view: function() {
				var tempSprite = game.add.sprite(0, 0, 'redCommand');
				tempSprite.alpha = 0;
				return tempSprite;
			}
		};
	},

	removeCards: function() {
		this.oneCard = this.checkCardsExist(this.oneCard);
		this.twoCard =this.checkCardsExist(this.twoCard);
		game.add.tween(this.twoCard.view()).to({
			alpha: 0,
		}, 600, Phaser.Easing.Linear.None, true, 600);

		var tween = game.add.tween(this.oneCard.view()).to({
			alpha: 0,
		}, 600, Phaser.Easing.Linear.None, true, 600);
		tween.onComplete.add(this.destroyCards, this);
		tween.onComplete.add(game.global.round.changeTurn, game.global.round.context);

	},

	destroyCards: function() {
		this.oneCard.view().destroy();
		this.twoCard.view().destroy();
		this.oneCard = undefined;
		this.twoCard = undefined;
	},

	cardsEqual: function(oneCard, twoCard) {
		oneCard = this.checkCardsExist(oneCard);
		twoCard = this.checkCardsExist(twoCard);
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
};