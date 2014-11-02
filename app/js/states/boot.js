var game = window.game || {};

var bootState = {
	preload: function() {
		//Load the image
		game.load.image('progressBar', 'assets/progressBar.png');
	},

	create: function() {
		this.createBackgroundColor();
		this.loadNextState();

		if (!game.device.desktop) {
			game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
			document.body.style.backgroundColor = '#3498db';
		}

	},

	createBackgroundColor: function() {
		//Set the background color of the stage to a light blue color
		game.stage.backgroundColor = '#3498db';
	},

	loadNextState: function() {
		game.state.start('load');
	}
};