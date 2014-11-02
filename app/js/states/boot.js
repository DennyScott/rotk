var game;
var Phaser;
window.states = window.states || {};


window.states.bootState = {
	preload: function() {
		game = window.game || {};
		Phaser = window.Phaser || {};
		//Load the image
		game.load.image('progressBar', 'assets/progressBar.png');
	},

	create: function() {
		this.createBackgroundColor();
		this.loadNextState();

		if (!game.device.desktop) {
			game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
			document.body.style.backgroundColor = '#3498db';

			// Set the min and max width/height of the game
			game.scale.minWidth = 250;
			game.scale.minHeight = 170;
			game.scale.maxWidth = 1000;
			game.scale.maxHeight = 680;

			
			// Center the game on the screen
			game.scale.pageAlignHorizontally = true;
			game.scale.pageAlignVertically = true;
			// Apply the scale changes
			game.scale.setScreenSize(true);
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