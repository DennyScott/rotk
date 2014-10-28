var bootState = {
	preload: function() {
		//Load the image
		game.load.image('progressBar', 'assets/progressBar.png');
	},

	create: function() {
		this.createBackgroundColor();
		this.loadNextState();

	},

	createBackgroundColor: function() {
		//Set the background color of the stage to a light blue color
		game.stage.backgroundColor = '#3498db';
	},

	loadNextState: function() {
		game.state.start('load');
	}
};