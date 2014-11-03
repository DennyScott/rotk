var game;
var Phaser;
window.states = window.states || {};


window.states.menuState = {
	preload: function() {
		game = window.game || {};
		Phaser = window.Phaser || {};
	},

	create: function() {
		this.createPlayers();
		this.loadLocalStorage(); //Sets up local storage options, including loading previous high scores	
		this.setHighScore(); //Sets up the high score to be saved to local storage if last game was higher
		this.createBackgroundImage(); //Creates a background image for the menu
		this.createNameLabel(); //Creates a Name Label for the Menu
		this.createStartLabel(); //Create the start Label to tell the user to start the game
		this.createBlinkingText(); //Creates the blinking objection and hold it in the title screen
		this.setUpInput(); //Sets up user input when the menu begins to start the game
	},
	/**
	 * Creates a background image behind the menu
	 * @return {void} No Return Value
	 */
	createBackgroundImage: function() {
		//Add a background image
		// game.add.image(0, 0, 'background');
	},

	createBlinkingText: function() {
		var objection = game.add.text(0, 0,
			'Objection!', {
				font: '70px Arial',
				fill: '#ffff00',
				align: 'center'
			});

		objection.anchor.setTo(0.5, 0.5);
		objection.alpha = 0;
		objection.angle = -45;
		objection.x = game.world.width * 0.25;
		objection.y = game.world.centerY;

		game.add.tween(objection).to({
			alpha: 1
		}, 1).delay(1500).to({
			alpha: 0
		}, 1200).start().loop();



		var holdIt = game.add.text(0, 0,
			'Hold It!', {
				font: '70px Arial',
				fill: '#ffff00',
				align: 'center'
			});

		holdIt.anchor.setTo(0.5, 0.5);
		holdIt.alpha = 0;
		holdIt.angle = 45;
		holdIt.x = game.world.width * 0.75;
		holdIt.y = game.world.centerY;

		setTimeout(function() {
			game.add.tween(holdIt).to({
				alpha: 1
			}, 1).delay(1500).to({
				alpha: 0
			}, 1200).start().loop();
		}, 200);
	},

	createPlayers: function() {
		game.global.playerOne = new game.player('Denny');
		game.global.playerTwo = new game.player('Travis');
		game.global.playerOne.opponent = game.global.playerTwo;
		game.global.playerTwo.opponent = game.global.playerOne;
		game.global.currentPlayer = game.global.playerOne;
	},

	/**
	 * Starts the next state
	 * @return {void} No return value
	 */
	start: function() {
		//Start the actual game
		game.state.start('cardSelection');
	},

	/**
	 * Toggles the sound on and off when called
	 * @return {void} No Return Value
	 */
	toggleSound: function() {
		//Switch the Pahser sound variable from true to flase, or false
		//to true.
		game.sound.mute = !game.sound.mute;

		//Change the frame of the button
		this.muteButton.frame = game.sound.mute ? 1 : 0;
	},

	/**
	 * Loads need variables from local storage
	 * @return {void} No Return Value
	 */
	loadLocalStorage: function() {

		//If bestScore is not defined it
		//means that this is the first time the game is being played
		if (!localStorage.getItem('rotk.bestScore')) {
			//Then set the best score to 0
			localStorage.setItem('rotk.bestScore', 0);
		}
	},

	/**
	 * Sets the new highscore into localStorage
	 */
	setHighScore: function() {
		//If the score is higher then the best score
		if (game.global.score > localStorage.getItem('rotk.bestScore')) {
			//then update the best score
			localStorage.setItem('rotk.bestScore', game.global.score);
		}
	},

	createButton: function() {
		var startX = game.world.width + 180;
		var endX = game.world.centerX;

		this.nextButton = game.add.button(startX, game.world.height * 0.9, 'nextButton', this.start, this);
		this.nextButton.anchor.setTo(0.5, 0.55);
		var text = 'Start';
		this.nextButton.buttonText = game.add.text(0, 0,
			text, {
				font: '30px Arial',
				fill: '#ffffff',
				align: 'center'
			});
		this.nextButton.buttonText.anchor.setTo(0.5, 0.5);
		this.nextButton.addChild(this.nextButton.buttonText);


		game.add.tween(this.nextButton).to({
			x: endX
		}, 1000, Phaser.Easing.Bounce.Out, true, 500);


		this.nextButton.input.useHandCursor = true; //if you want a hand cursor
	},

	createStartLabel: function() {
		//Store the relevant text based the device used
		this.createButton();
	},

	createNameLabel: function() {
		//Display the name of the game
		var nameLabel = game.add.text(game.world.centerX, -50, 'Debate!', {
			font: '90px Geo',
			fill: '#ffffff'
		});
		nameLabel.anchor.setTo(0.5, 0.5);

		//Create a tween on teh label
		game.add.tween(nameLabel).to({
			y: game.world.height * 0.15
		}, 1000).easing(Phaser.Easing.Bounce.Out)
			.start();
	},

	/**
	 * Sets up the menu to accept a specific input to start the game and load the next state
	 */
	setUpInput: function() {
		//No Input for this game currently
	}
};