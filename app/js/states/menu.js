var menuState = {

	create: function() {
		this.loadLocalStorage(); //Sets up local storage options, including loading previous high scores	
		this.setHighScore(); //Sets up the high score to be saved to local storage if last game was higher
		this.createBackgroundImage(); //Creates a background image for the menu
		this.createNameLabel(); //Creates a Name Label for the Menu
		this.createStartLabel(); //Create the start Label to tell the user to start the game
		this.setUpInput(); //Sets up user input when the menu begins to start the game
		this.setUpMute(); //Sets up the mute option in the top left of the screen
	},
	/**
	 * Creates a background image behind the menu
	 * @return {void} No Return Value
	 */
	createBackgroundImage: function() {
		//Add a background image
		// game.add.image(0, 0, 'background');
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

	createStartLabel: function() {
		//Store the relevant text based the device used
		if (game.device.desktop) {
			text = 'press the up arrow key to start';
		} else {
			text = 'touch the screen to start';
		}

			//Explain how to start the game
		var startLabel = game.add.text(game.world.centerX, game.world.height-80,
			text, {
				font: '25px Arial',
				fill: '#ffffff'
			});
		startLabel.anchor.setTo(0.5, 0.5);

		game.add.tween(startLabel).to({angle: -2}, 500).to({angle:2}, 500).loop()
			.start();
	},

	createNameLabel: function() {
		//Display the name of the game
		var nameLabel = game.add.text(game.world.centerX, -50, 'Debate!', {
			font: '70px Geo',
			fill: '#ffffff'
		});
		nameLabel.anchor.setTo(0.5, 0.5);

		//Create a tween on teh label
		game.add.tween(nameLabel).to({
			y: 80
		}, 1000).easing(Phaser.Easing.Bounce.Out)
			.start();
	},

	/**
	 * Sets up the menu to accept a specific input to start the game and load the next state
	 */
	setUpInput: function() {
		//Store the up arrow into a variable
		var upKey = game.input.keyboard.addKey(Phaser.Keyboard.UP);

		//Create a new Phaser keyboard variable: the up arrow key
		upKey.onDown.addOnce(this.start, this);
	},

	/**
	 * Initalizes and has the mute button in the top left to react to player input
	 */
	setUpMute: function() {
		//Add the mute button that calls the toggleSound function when pressed
		this.muteButton = game.add.button(20, 20, 'mute', this.toggleSound, this);

		//If the mouse is over the button it becomes a hand cursor
		this.muteButton.input.useHandCursor = true;

		//If the game is already muted
		if (game.sound.mute) {
			//Change the frame to already display the mute symbol
			this.muteButton.frame = 1;
		}
	}
}