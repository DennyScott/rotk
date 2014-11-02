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
		game.add.tween(nameLabel).to({
			y: 80
		}, 1000).easing(Phaser.Easing.Bounce.Out)
			.start();

		nameLabel.callback.add(function() {
				var nameLabel = game.add.text(-200, game.world.centerY, game.global.winner, {
					font: '70px Geo',
					fill: '#ffffff'
				});
				nameLabel.anchor.setTo(0.5, 0.5);

				//Create a tween on teh label
				game.add.tween(nameLabel).to({
					x: game.world.centerX
				}, 1000).easing(Phaser.Easing.Bounce.Out)
					.start();

		});
	},
}