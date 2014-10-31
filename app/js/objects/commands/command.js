(function() {

	/**
	 * The Command class, this is the class all other commands will inherit off of.  It has the basic things that must be in every card.
	 * @param {Player} owner The owner of this card
	 * @param {[type]} type  [description]
	 * @param {[type]} value [description]
	 */
	var Command = function(owner, type, value) {
		var _command = this;
		var _sprite;
		this.owner;
		this.type;
		this.value;

		/**
		 * Coonstructor for the command class
		 * @param  {String} type  The type of card.  i.e. Ability or Regular
		 * @param  {String} value It can be either a String or a number, this can be the name of the skill or the number of the card
		 * @return {Void}       No Return Value
		 */
		var _initalize = function(owner, type, value) {
			_command.type = type;
			_command.value = value;
			_command.owner = owner
		};

		/**
		 * Adds the card to the game world
		 * @param {int} x      The x position of the command
		 * @param {int} y      The y position of the command
		 * @param {String} sprite The key for the sprite this object uses
		 */
		this.createView = function(x, y, sprite) {
			_sprite = game.add.sprite(x, y, sprite); //Create Sprite

			_sprite.innerText = game.add.text(0, 0,
				value, {
					font: '30px Arial',
					fill: '#ffffff',
					align: 'center'
				});
			_sprite.innerText.anchor.setTo(0.5, 0.5);
			_sprite.addChild(_sprite.innerText);
			_sprite.anchor.setTo(0.5, 0.5);

			_sprite.inputEnabled = true;
			_sprite.input.useHandCursor = true; //if you want a hand cursor
			_sprite.card = _command; //This is to create a two way binding that both sides have reference to eachother
		}

		this.clearView = function () {
			_sprite = undefined;
		}

		/**
		 * Returns the view to the user
		 * @return {Phaser.Sprite} The sprite of the command
		 */
		this.view = function() {
			return _sprite;
		}

		_initalize(owner, type, value); //Call Constructor
	}

	game.Command = Command; //Add to global Namespace
})();