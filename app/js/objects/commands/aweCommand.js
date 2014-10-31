(function() {

	var AweCommand = function(type, value, description) {
		_command = this;
		this.description;
		this.number;
		
		var _initalize = function(type, description) {
			var value = game.rnd.integerInRange(1, 9);
			game.Command.call(_command, type, value);
			this.description = description;
		};

		_initalize(type, value, description); //Call Constructor

		var _addVisibleCommand = _command.addVisibleCommand;

		this.addVisibleCommand = function (x, y) {
			var sprite = 'abilityCommand';
			_addVisibleCommand(x, y, sprite);
		}
	}

	AweCommand.prototype = Object.create(game.Command.prototype);

	game.AweCommand = AweCommand; //Add to global Namespace
})();