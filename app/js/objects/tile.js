(function() {
	
	/**
	 * Tile Object. Used for the 9 Tiles displayed in the Game Board.
	 * @param {[String]} text Number/Position to be displayed on Tile.
	 */
	var Tile = function(text) {
		var _tile = this;
		var _text;
		var _sprite;
		var _scale; //Scale of the smaller tiles compared to the larger tiles.


		/**
		 * Constructor
		 * @param  {[type]} text Number/Position to be displayed on Tile
		 */
		var _initalize = function(text) {

			if (typeof text !== 'undefined') {
				_text = text;
			}

		};

		/**
		 * Add a tile Sprite. This will render a 'whiteTile' sprite,
		 * in the designated position and scale
		 * 
		 * @param {[int]} x     X coordinate of the Tile
		 * @param {[int]} y     Y coordinate of the Tile.
		 * @param {[float]} scale Scale of the Tile
		 * @param {[Object]} group Optional, group for sprite to be added to.
		 */
		this.addSprite = function(x, y, scale, group) {
			if(typeof scale === 'undefined'){
				_scale = 1; //No Scale Designated.
			}
			_scale = scale; //Set Instance Scale
			_renderSprite(x, y, group); //Render the Tile
			_renderText(); //Render the Text onto of the Tile

			return _sprite; //Return the rendered Tile
		};

		/**
		 * Get Text
		 * @return {[Int]} The Number/Position of the text
		 */
		this.text = function(){
			return _text;
		};

		/**
		 * Render the passed Text. This will create Game Text as a
		 * child of the sprite object, and place the text in the
		 * center of the sprite.
		 * 
		 */
		var _renderText = function() {
			var mid = _sprite.width * 1.5; //Find the Mid point for the Text

			//Create the Text
			var spriteText = game.add.text(mid, mid, _text, {
				font: mid / 1.5 + 'px Geo',
				fill: '#000000'
			});

			spriteText.anchor.setTo(0.5, 0.5); //Set Anchor for Text
			spriteText.angle = -45; //Rotate back 45 degrees, to make it straigtened.

			//Add The text as a Child to the Sprite
			_sprite.addChild(spriteText);
		};

		/**
		 * Render the Sprite Object. This will create a Sprite object
		 * given the passed x, y, and instance scale. The group is
		 * optional.
		 * 
		 * @param  {[int]} x     X Coordinates for the sprite to be created at.
		 * @param  {[int]} y     Y Coordinates for Sprite to be created at
		 * @param  {[object]} group Optional, group to be added to.
		 */
		var _renderSprite = function(x, y, group) {
			if (typeof group !== 'undefined') {
				_sprite = game.add.sprite(x, y, 'whiteTile', null, group);
			} else {
				_sprite = game.add.sprite(x, y, 'whiteTile');
			}

			//Set the Scale of the Sprite
			_sprite.scale.x = _scale;
			_sprite.scale.y = _scale;
		};

		_initalize(text); //Contstructor
	};

	game.tile = Tile; //Add to Game Object
})();