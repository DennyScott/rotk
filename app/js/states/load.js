var loadState = {
	preload: function() {
		this.createLoadScreen(); //Creates the load screen to watch.  This must be first

		//Loads all needed Assets
		this.loadImageAssets();
		this.loadSpritesheetAssets();
		this.loadTilesetAssets();
		this.loadAudioAssets();

	},

	create: function() {
		this.loadNextState();
	},

	createLoadScreen: function() {
		//Add a loading... label on the screen
		var loadingLabel = game.add.text(game.world.centerX, 150, 'loading...', {
			font: '30px Arial',
			fill: '#fffff'
		});
		loadingLabel.anchor.setTo(0.5, 0.5);

		//Display the progress bar
		var progressBar = game.add.sprite(game.world.centerX, 200, 'progressBar');
		progressBar.anchor.setTo(0.5, 0.5);
		game.load.setPreloadSprite(progressBar);
	},
	loadAudioAssets: function() {

	},

	loadImageAssets: function() {
		//Load a new asset that we will use in the menu state
		game.load.image('background', 'assets/background.png');
		game.load.image('card', 'assets/card.png');
		game.load.image('blackTile', 'assets/BlackSquare.png');
		game.load.image('whiteTile', 'assets/WhiteSquare.png');
		game.load.image('redTile', 'assets/RedSquare.png');
		game.load.image('blueTile', 'assets/BlueSquare.png');
		game.load.image('greenTile', 'assets/GreenSquare.png');
	},

	loadNextState: function() {
		game.state.start('menu');
	},

	loadSpritesheetAssets: function() {
		//Load mute button spritesheet
		game.load.spritesheet('mute', 'assets/muteButton.png', 28, 22);
	},

	loadTilesetAssets: function() {

	},

};