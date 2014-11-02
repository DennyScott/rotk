var game = window.game || {};
var Phaser = window.Phaser || {};

game.animations = {
	showCards: function(oneCard, twoCard) {
		this.clearBoard();

		this.setAlpha = 1;

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
		}, 800, Phaser.Easing.Linear.None, true, 1500);
	},

	clearBoard: function() {
		game.global.playerOne.clearCards();
		game.global.playerTwo.clearCards();
	},

	cardWinner: function(winner, loser) {
		loser = this.checkCardsExist(loser);
		var _this = this;
		setTimeout(function() {
			loser.view().alpha = _this.setAlpha;
			var tween = game.add.tween(loser.view()).to({
				alpha: 0,
				y: loser.view().y - 20
			}, 1200, Phaser.Easing.Linear.None, true, 800);
			tween.onComplete.add(_this.removeCards, _this);
		}, 1200)

	},

	checkCardsExist: function(card) {
		if (typeof card === 'undefined') {
			this.setAlpha = 0;
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
		this.twoCard = this.checkCardsExist(this.twoCard);
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

	defenceCounter: function(card, defenceCard) {
		this.setAlpha = 0; //Set the Alpha to 0, so the old loser card will disappear
		var cView = card.view();
		defenceCard.createView(cView.x, cView.y);
		var dView = defenceCard.view();
		dView.scale.x = dView.scale.y = cView.scale.x;
		dView.alpha = 1;

		//Hide the view of the loser card
		if (card.owner === this.oneCard.owner) {
			this.oneCard.view().alpha = 0;
		} else {
			this.twoCard.view().alpha = 0;
		}

		this.animateDefenceCard(dView); //Perform Animations for Defence Couhnter


	},

	animateDefenceCard: function(dView) {
		game.add.tween(dView.scale).to({
			x: dView.scale.x + .1,
			y: dView.scale.x + .1,
		}, 300, Phaser.Easing.Linear.None, true, 50)
			.to({
				x: dView.scale.x - .2,
				y: dView.scale.x - .2,
			}, 300, Phaser.Easing.Linear.None, true, 50)
			.to({
				x: dView.scale.x + .15,
				y: dView.scale.x + .15,
			}, 200, Phaser.Easing.Linear.None, true, 50)
			.to({
				x: dView.scale.x - .05,
				y: dView.scale.x - .05,
			}, 100, Phaser.Easing.Linear.None, true, 50);

		game.add.tween(dView).to({
			alpha: 0
		}, 2500, Phaser.Easing.Linear.None, true, 1400);
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