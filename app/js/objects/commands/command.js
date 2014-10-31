(function() {

	var Command = function(type, value) {
		var _command = this;
		var _sprite;
		this.type;
		this.value;

		var _initalize = function(type, value) {
			_command.type = type;
			_command.value = value;
		};

		this.addVisibleCommand = function (x, y, sprite) {
			_sprite = game.add.sprite(x, y, sprite); //Create Sprite
		}

		_initalize(type, value); //Call Constructor
	}

	game.Command = Command; //Add to global Namespace
})();