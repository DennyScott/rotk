var menuState = {
	create: function(){
		this.createNameLabel();
		this.createStartLabel();
		this.clickUpToStart();
	},

	start: function() {
		//Start the actual game
		game.state.start('play');
	},

	clickUpToStart: function() {
		//Create a new Phaser keyboard variable, the up arrow key
		var upKey = game.input.keyboard.addKey(Phaser.Keyboard.UP);

		//When the 'upKey' is pressed, it will call the 'start' function once
		upKey.onDown.addOnce(this.start, this);
		game.input.onDown.addOnce(this.start, this);
	},

	createStartLabel: function() {
		//Store the relevant text based the device used
		if(game.device.desktop){
			text = 'press the up arrow key to start';
		}else{
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
		var nameLabel = game.add.text(game.world.centerX, -50, 'ROTK', {
			font: '70px Geo',
			fill: '#ffffff'
		});
		nameLabel.anchor.setTo(0.5, 0.5);

		//Create a tween on teh label
		game.add.tween(nameLabel).to({y: 80}, 1000).easing(Phaser.Easing.Bounce.Out)
			.start();
	}
}