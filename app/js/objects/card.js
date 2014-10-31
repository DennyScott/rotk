(function() {

	var Card = function() {
		var _card = this;
		var _sprite;

		var _initalize = function() {
			
		};

		this.addVisibleCard(x, y) {
			_sprite = game.add.sprite(x, y, upCard); //Create Sprite
		}

		_initalize(); //Call Constructor
	}

	game.card = Card; //Add to global Namespace
})();