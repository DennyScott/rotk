(function() {
	var game = window.game || {};

	/**
	 * Arrow Class. Used to create the arrow sprite, and
	 * track the current suprior number order (lows or highs)
	 *
	 * @param {int} x     X Coordinate to display the Arrow At
	 * @param {int} y     Y coordinate to display the arrow at
	 * @param {int} scale The Scale to display the arrow
	 */
	var Arrow = function(x, y, scale) {
		var _isUp; //Boolean of arrow direction
		var _sprite; //The drawn sprite of the arrow
		var upArrow = 'upArrow'; //Up Arrow Texture
		var downArrow = 'downArrow'; //Down Arrow Texture

		/**
		 * Constructor
		 *
		 * @param {int} x     X Coordinate to display the Arrow At
		 * @param {int} y     Y coordinate to display the arrow at
		 * @param {int} scale The Scale to display the arrow
		 */
		var _initalize = function(x, y, scale) {
			_isUp = true;
			_sprite = game.add.sprite(x, y, upArrow); //Create Sprite
			_sprite.anchor.setTo(0.5, 0.5);

			//Set scale
			_sprite.scale.x = scale;
			_sprite.scale.y = scale;
		};

		/**
		 * Public call to flip the arrow. This will determine which texture
		 * to call call a private renderer with.
		 *
		 */
		this.flip = function() {
			var tween = game.add.tween(_sprite).to({
				angle: '+180',
			}, 1600, Phaser.Easing.Bounce.Out, true, 0);
			_isUp = !_isUp;
		};

		/**
		 * Get isUp Boolean
		 * @return {Boolean} Is Arrow currently up?
		 */
		this.isUp = function() {
			return _isUp;
		};


		_initalize(x, y, scale); //Call Constructor
	};


	game.arrow = Arrow; //Add to global Namespace
})();