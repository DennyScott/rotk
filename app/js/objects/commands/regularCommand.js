(function() {

	var RegularCommand = function(type, value, color) {
		_command = this;
		this.color;
		
		var _initalize = function(type, value, color) {
			game.Command.call(_command, type, value);
			_command.color = color;
		};

		_initalize(type, value, color); //Call Constructor

		var _addVisibleCommand = _command.addVisibleCommand;

		this.addVisibleCommand = function (x, y) {
			var sprite = color.toLowerCase() + 'Command';
			_addVisibleCommand(x, y, sprite);
		}
	}

	RegularCommand.prototype = Object.create(game.Command.prototype);

	game.RegularCommand = RegularCommand; //Add to global Namespace
})();