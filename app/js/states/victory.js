var victoryState = {
	preload: function() {

	},

	create: function() {
		this.createNameLabel();
	},

	createNameLabel: function() {
		//Display the name of the game
		var nameLabel = game.add.text(game.world.centerX, -50, 'And the Winner is...!', {
			font: '50px Geo',
			fill: '#ffffff'
		});
		nameLabel.anchor.setTo(0.5, 0.5);

		//Create a tween on teh label
		var tween = game.add.tween(nameLabel).to({
				y: 80
			}, 1000).easing(Phaser.Easing.Bounce.Out)
			.start();

		tween.onComplete.add(function() {
			var nameLabel = game.add.text(-200, game.world.centerY, game.global.winner.name(), {
				font: '70px Geo',
				fill: '#ffffff'
			});
			nameLabel.anchor.setTo(0.5, 0.5);

			//Create a tween on teh label
			var tween2 = game.add.tween(nameLabel).to({
					x: game.world.centerX
				}, 1000).easing(Phaser.Easing.Bounce.Out)
				.start();

			tween2.onComplete.add(function() {
				var startX = game.world.width + 180;
				var endX = game.world.centerX;

				this.nextButton = game.add.button(startX, game.world.height - 60, 'nextButton', this.menu, this);
				this.nextButton.anchor.setTo(0.5, 0.55);
				var text = 'Back to Start';
				this.nextButton.buttonText = game.add.text(0, 0,
					text, {
						font: '20px Arial',
						fill: '#ffffff',
						align: 'center'
					});
				this.nextButton.buttonText.anchor.setTo(0.5, 0.5);
				this.nextButton.addChild(this.nextButton.buttonText);


				game.add.tween(this.nextButton).to({
					x: endX
				}, 1000, Phaser.Easing.Bounce.Out, true, 500);


				this.nextButton.input.useHandCursor = true; //if you want a hand cursor
			}, this)

		}, this);
	},

	menu: function () {
		game.state.start('menu');
	}
}